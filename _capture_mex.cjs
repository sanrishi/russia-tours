const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  const client = await page.createCDPSession();
  await client.send("Tracing.start", {
    categories:
      "-*,disabled-by-default-devtools.timeline,devtools.timeline,blink,blink.user_timing,loading,metrics",
    transferMode: "ReturnAsStream",
  });

  await page.goto("https://tripstorussia.com/moscow-express", {
    waitUntil: "networkidle0",
    timeout: 60000,
  });

  const traceChunks = [];
  client.on("Tracing.dataCollected", (chunk) => {
    if (chunk.value) traceChunks.push(...chunk.value);
  });
  await client.send("Tracing.end");
  await new Promise((r) => setTimeout(r, 3000));

  const events = traceChunks;
  console.log("Captured", events.length, "trace events");

  // Collect long main-thread tasks
  const tasks = [];
  for (const e of events) {
    const name = e.name || "";
    const dur = e.dur || 0;
    if (dur < 10000) continue;
    let location = "unknown";
    const stack = e.args?.data?.stackTrace || [];
    for (const f of stack.slice(0, 5)) {
      const fn = f.fileName || "";
      const ln = f.lineNumber || "";
      if (fn) {
        const short = fn.includes("node_modules")
          ? ".../" + fn.split("node_modules").pop()
          : fn;
        location = short + ":" + ln;
        break;
      }
    }
    if (
      name === "FunctionCall" || name === "RunTask" ||
      name === "TimerFire" || name === "AnimationFrameFire" ||
      name === "Layout" || name === "UpdateLayoutTree"
    ) {
      tasks.push({ dur, name, location });
    }
  }

  tasks.sort((a, b) => b.dur - a.dur);
  console.log("\n=== LONGEST TASKS (>10ms) ===");
  for (const t of tasks.slice(0, 40)) {
    console.log(
      (t.dur / 1000).toFixed(1).padStart(8) + "ms  " +
      t.name.padEnd(20) + "  " +
      (t.location || "unknown").slice(0, 120)
    );
  }

  const totalMain = tasks.reduce((s, t) => s + t.dur, 0);
  console.log("\nTotal captured work: " + (totalMain / 1e6).toFixed(1) + "s");

  // LCP
  const lcp = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        resolve(
          entries.map((e) => ({
            startTime: e.startTime,
            renderTime: e.renderTime,
            size: e.size,
            tag: e.element?.tagName || "unknown",
            id: e.element?.id || "",
            classes: e.element?.className || "",
            src: e.element?.src || "",
            text: (e.element?.textContent || "").slice(0, 60),
          }))
        );
      }).observe({ type: "largest-contentful-paint", buffered: true });
    });
  });
  console.log("\n=== LCP ELEMENTS ===");
  console.log(JSON.stringify(lcp, null, 2));

  // Network timing
  const perf = await page.evaluate(() => {
    const entries = performance.getEntriesByType("resource");
    return entries
      .sort((a, b) => a.startTime - b.startTime)
      .map((e) => ({
        url: e.name.split("/").pop()?.slice(0, 50) || e.name.slice(0, 50),
        start: Math.round(e.startTime),
        dur: Math.round(e.duration),
        size: Math.round(e.transferSize || 0),
      }));
  });
  console.log("\n=== NETWORK REQUESTS (slowest) ===");
  perf.sort((a, b) => b.dur - a.dur);
  for (const r of perf.slice(0, 30)) {
    console.log(
      r.dur.toString().padStart(7) + "ms  size=" +
      (r.size / 1024).toFixed(0).padStart(5) + "KB  " +
      r.url.slice(0, 55)
    );
  }

  await browser.close();
})();
