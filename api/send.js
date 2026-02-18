import nodemailer from "nodemailer";

export default async function handler(req, res) {
    // Helper to handle both Vercel and raw Node response objects
    const sendResponse = (status, data) => {
        if (res.status) {
            return res.status(status).json(data);
        }
        res.statusCode = status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
    };

    if (req.method !== "POST") {
        return sendResponse(405, { success: false, message: "Method Not Allowed" });
    }

    try {
        // Handle body parsing for cases where req.body isn't prepopulated (like local Vite)
        let body = req.body;
        if (!body) {
            body = await new Promise((resolve, reject) => {
                let data = "";
                req.on("data", (chunk) => { data += chunk; });
                req.on("end", () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        resolve({});
                    }
                });
                req.on("error", reject);
            });
        }

        const { email } = body;

        if (!email) {
            return sendResponse(400, { success: false, message: "Email is required" });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
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

        return sendResponse(200, { success: true, message: "Subscribed successfully!" });
    } catch (error) {
        console.error("SMTP Error:", error);
        return sendResponse(500, {
            success: false,
            message: "Failed to send email",
            error: error.message,
        });
    }
}
