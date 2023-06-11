import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { transporter } from "~/lib/emailTransporter";
import twilioClient from "~/lib/twilioClient";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const readyToBeSentCapsules = await prisma.capsule.findMany({
    where: {
      dateTime: {
        gte: startDate,
        lt: endDate,
      },
      opened: false,
    },
  });
  if (!readyToBeSentCapsules.length) {
    return res.status(204);
  } else {
    readyToBeSentCapsules.forEach((capsule) => {
      console.log(capsule.id);
      capsule.sendingMethod.forEach((method) => {
        console.log(method);
        if (method === "call" && capsule.call) {
          twilioClient.calls
            .create({
              twiml: `<Response><Say>${capsule.message}</Say></Response>`,
              to: capsule.call,
              from: "+447360265035",
            })
            .then((call) => console.log(call.sid))
            .catch((e) => console.error(e));
        }
        if (method === "sms" && capsule.sms) {
          twilioClient.messages
            .create({
              from: "+447360265035",
              to: capsule.sms,
              body: capsule.message,
            })
            .then((call) => console.log("[sms sent] id:", call.sid))
            .catch((e) => console.error(e));
        }
        if (method === "whatsapp" && capsule.whatsapp) {
          twilioClient.messages
            .create({
              from: "+447360265035",
              to: `whatsapp:${capsule.whatsapp}`,
              body: capsule.message,
            })
            .then((call) => console.log("[whats app sent] id:", call.sid))
            .catch((e) => console.error(e));
        }
        if (method === "email" && capsule.email) {
          // send email
          transporter
            .sendMail({
              from: env.EMAIL_FROM,
              to: capsule.email,
              subject:
                "Hello from messageTT, your time capsule is ready to be opened",
              text: capsule.message,
              html: `<p>${capsule.message}</p>`,
            })
            .then((email) => console.log("email sent to: ", email))
            .catch((e) => console.error(e));
        }
      });
    });
  }

  await prisma.capsule.updateMany({
    where: { dateTime: { gte: startDate, lt: endDate } },
    data: { opened: true },
  });
  return res.status(200).json({ sent: true });
}
