import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not set");
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, phone, city, group_size, budget, travel_period, requirements, email, message, page } = body;

    const { data, error } = await resend.emails.send({
      from: "Indosvetka <enquiries@tripstorussia.com>",
      to: "Svetainindia07@gmail.com",
      subject: `New Enquiry${page ? ` — ${page}` : ""} from ${name}`,
      text: `Name: ${name}
Phone: ${phone}
${email ? `Email: ${email}` : ""}
City: ${city}
Group Size: ${group_size}
Budget: ${budget}
Travel Period: ${travel_period}
${requirements ? `Requirements: ${requirements}` : ""}
${message ? `Message: ${message}` : ""}`,
    });

    if (error) {
      console.error("resend error:", JSON.stringify(error));
    } else {
      console.log("resend success:", JSON.stringify(data));
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("enquiry api error:", e);
    return NextResponse.json({ success: true });
  }
}
