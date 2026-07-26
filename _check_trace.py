import json

with open("mexpress-trace.json") as f:
    d = json.load(f)

print("Has traceEvents:", "traceEvents" in d)
print("Keys:", [k for k in d.keys() if not k.startswith("_")][:20])

# Check each key
for k in d.keys():
    v = d[k]
    if isinstance(v, dict):
        te = v.get("traceEvents")
        if te:
            print("traceEvents in key:", k, "count:", len(te))
        for k2 in v.keys():
            if "trace" in k2.lower():
                print("Trace-related:", k, k2)
