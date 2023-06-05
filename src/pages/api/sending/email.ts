import type { NextApiRequest, NextApiResponse } from "next";
// import sendEmail from "~/lib/emailTransporter";
import schedule from "node-schedule";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const date = new Date(2023, 6, 4, 11, 13, 0);

    const job = schedule.scheduleJob(date, function () {
      console.log("The world is going to end today.");
    });
    // const response = await sendEmail();
    res.status(200).json({ message: "Hello World", job });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
