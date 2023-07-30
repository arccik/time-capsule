import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const generateDate = () => {
  //     return new Date(new Date().valueOf() - Math.random() * 1e12);
  //   };
  function randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  const data = await prisma.capsule.findMany({
    where: { email: "alexklan34@gmail.com" },
  });
  data?.forEach(async (capsule) => {
    await prisma.capsule.update({
      where: {
        id: capsule.id,
      },
      data: {
        dateTime: randomDate(new Date(2013, 0, 1), new Date(2023, 1, 1)),
      },
    });
  });
  res.status(200).json({ message: "done" });
}
