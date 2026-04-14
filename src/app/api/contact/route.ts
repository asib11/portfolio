import { NextRequest, NextResponse } from "next/server";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormData = await req.json();
    const { name, email, phone, address, message } = body;

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // ======================================================
    // TODO: Add email sending here when ready.
    // Example (using Nodemailer or Resend):
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Portfolio <noreply@asibahmed.me>",
    //   to: "asib.bubt@gmail.com",
    //   replyTo: email,
    //   subject: `New message from ${name}`,
    //   html: `<p><b>Name:</b> ${name}</p>
    //          <p><b>Email:</b> ${email}</p>
    //          <p><b>Phone:</b> ${phone}</p>
    //          <p><b>Address:</b> ${address}</p>
    //          <p><b>Message:</b><br/>${message}</p>`,
    // });
    // ======================================================

    // Log submission for now
    console.log("📬 New contact form submission:", {
      name,
      email,
      phone,
      address,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
