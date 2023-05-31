import type { NextApiRequest, NextApiResponse } from "next";
import sendEmail from "~/lib/emailTransporter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const response = await sendEmail();
    res.status(200).json({ message: "Hello World", response });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
