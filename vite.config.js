import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import nodemailer from "nodemailer";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
      svgr({
        svgrOptions: {
          exportType: "default",
        },
      }),
      {
        name: "api-handler",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === "/api/send" && req.method === "POST") {
              let body = "";
              req.on("data", (chunk) => {
                body += chunk.toString();
              });

              req.on("end", async () => {
                try {
                  const { email } = JSON.parse(body);

                  if (!email) {
                    res.statusCode = 400;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ success: false, message: "Email is required" }));
                    return;
                  }

                  const transporter = nodemailer.createTransport({
                    host: env.SMTP_HOST,
                    port: parseInt(env.SMTP_PORT),
                    secure: false,
                    auth: {
                      user: env.SMTP_USER,
                      pass: env.SMTP_PASS,
                    },
                  });

                  await transporter.sendMail({
                    from: `"WeInfluence Academy" <${env.SMTP_USER}>`,
                    to: env.TO_EMAIL,
                    subject: `New Newsletter Subscription: ${email}`,
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

                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ success: true, message: "Subscribed successfully!" }));
                } catch (error) {
                  console.error("SMTP Error:", error);
                  res.statusCode = 500;
                  res.setHeader("Content-Type", "application/json");
                  res.end(
                    JSON.stringify({
                      success: false,
                      message: "Failed to send email",
                      error: error.message,
                    })
                  );
                }
              });
            } else {
              next();
            }
          });
        },
      },
    ],
  };
});
