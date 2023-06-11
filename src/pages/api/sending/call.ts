import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import twilioClient from "~/lib/twilioClient";

const zodChecker = z.object({ number: z.string(), message: z.string() });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { message, number } = zodChecker.parse(req.body);

    if (!message || !number) {
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
