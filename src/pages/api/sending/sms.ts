import { Twilio } from "twilio";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new Twilio(accountSid, authToken);

const smsSchema = z.object({ number: z.string(), message: z.string() });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { message, number } = smsSchema.parse(req.body);
    if (!number || !message) {
      res.status(405).json({ message: "Number or message Missing" });
    }
    twilioClient.messages
      .create({
        from: "+447360265035",
        to: number,
        body: message,
      })
      .then((call) => console.log(call.sid))
      .catch((e) => console.error(e));
    res.status(200).json({ message: `Calling to ${number}` });
  }
}
