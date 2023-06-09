import type { NextApiRequest, NextApiResponse } from "next";
// import sendEmail from "~/lib/emailTransporter";
import schedule from "node-schedule";
import { env } from "~/env.mjs";
import { transporter } from "~/lib/emailTransporter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const date = new Date(2023, 6, 4, 11, 13, 0);

    const job = schedule.scheduleJob(date, function () {
      console.log("The world is going to end today.");
    });
    // const response = await sendEmail();
    res.status(200).json({ message: "Hello World", job });
  }
  if (req.method === "POST") {
    try {
      const { message, email }: { email: string; message: string } = req.body;
      if (!message || !email) {
        return res.status(400).json({ message: "Missing message or email" });
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
        return res.status(200).json({ message: "Email sent" });
      }
    } catch (error) {
      console.log("Error Sending emails: ", error);
      return res.status(500).json({ message: "Error Sending emails" });
    }
  }
}
