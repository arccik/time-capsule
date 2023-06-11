import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Cron Function Executed !!!!!!! at ", new Date());
  return res.status(200).json({ message: true });
}
