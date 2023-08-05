// import type { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "~/server/db";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   //   const generateDate = () => {
//   //     return new Date(new Date().valueOf() - Math.random() * 1e12);
//   //   };
//   function randomDate(start: Date, end: Date) {
//     return new Date(
//       start.getTime() + Math.random() * (end.getTime() - start.getTime())
//     );
//   }

//   function subtractYears(date: Date | null, years: number) {
//     if (!date) return;
//     date.setFullYear(date.getFullYear() - years);
//     return date;
//   }

//   const data = await prisma.capsule.findMany();
//   data?.forEach(async (capsule) => {
//     await prisma.capsule.update({
//       where: {
//         id: capsule.id,
//       },
//       data: {
//         // paid: true,
//         opened: true,
//         // openedAt: randomDate(new Date(2018, 0, 1), new Date(2023, 8, 1)),
//         createdAt: subtractYears(
//           capsule.openedAt,
//           Math.floor(Math.random() * 10) + 1
//         ),
//       },
//     });
//   });
//   res.status(200).json({ message: "done" });
// }
