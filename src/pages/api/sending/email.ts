import type { NextApiRequest, NextApiResponse } from "next";
// import sendEmail from "~/lib/emailTransporter";
import { z } from "zod";
import { env } from "~/env.mjs";
import { transporter } from "~/lib/emailTransporter";

const schema = z.object({ email: z.string(), message: z.string() });
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, message } = schema.parse(req.body);
      if ("email" in req.body && "message" in req.body) {
        if (!message || !email) {
          res.status(400).json({ message: "Missing message or email" });
        }
        const info = await transporter.sendMail({
          from: env.EMAIL_FROM,
          to: email,
          subject:
            "Hello from messageTT, your time capsule is ready to be opened",
          text: message,
          html: `<p>${message}</p>`,
        });

        if (info.messageId) {
          res.status(200).json({ message: "Email sent" });
        }
      }
    } catch (error) {
      console.log("Error Sending emails: ", error);
       res.status(500).json({ message: "Error Sending emails" });
    }
  }
}
