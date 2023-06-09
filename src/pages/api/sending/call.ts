// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import type { NextApiRequest, NextApiResponse } from "next";
import { Twilio } from "twilio";
import { z } from "zod";
const twilioClient = new Twilio(accountSid, authToken);

const zodChecker = z.object({ number: z.string(), message: z.string() });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { message, number } = zodChecker.parse(req.body);

    if (!message || number) {
      return res.status(400).json({ message: "Invalid Input" });
    } 
      
    twilioClient.calls
      .create({
        twiml: `<Response><Say>${message}</Say></Response>`,
        to: number,
        from: "+447360265035",
      })
      .then((call) => console.log(call.sid))
      .catch((e) => console.error(e));
    return res.status(200).json({ message: `Calling to ${number}` });
  }
}
