import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"WeInfluence Academy" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: `WeInfluence | New Newsletter Subscription: ${email}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #a1236b;">New Subscriber!</h2>
          <p>You have a new newsletter subscription from your website.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Email Address:</strong> ${email}</p>
          <br />
          <p style="font-size: 12px; color: #888;">This email was sent from the WeInfluence Academy website contact form.</p>
        </div>
      `,
    });

    return Response.json({ success: true, message: "Subscribed successfully!" });

  } catch (error) {
    console.error("SMTP Error:", error);
    return Response.json(
      { success: false, message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
