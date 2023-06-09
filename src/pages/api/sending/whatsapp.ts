// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import type { NextApiRequest, NextApiResponse } from "next";
import { Twilio } from "twilio";
const twilioClient = new Twilio(accountSid, authToken);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { number, message }: { number: string; message: string } = req.body;
    if (!number || !message) {
      return res.status(405).json({ message: "Number or message Missing" });
    }
    twilioClient.messages
      .create({
        from: "+447360265035",
        to: `whatsapp:${number}`,
        body: message,
      })
      .then((call) => console.log(call.sid))
      .catch((e) => console.error(e));
    return res.status(200).json({ message: `Calling to ${number}` });
  }
}
