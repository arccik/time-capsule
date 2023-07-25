import { type Capsule, PrismaClient } from "@prisma/client";
import type { GetStaticPaths, NextPage } from "next";
import Head from "next/head";

import TimeCapsuleForm from "~/components/capsule-form";
import Hero from "~/components/capsule-form/Hero";
import MessageGrid from "~/components/open-capsule/MessageGrid";

// export const getStaticProps = async ({
//   query,
// }: {
//   query: { page?: number };
// }) => {
//   const PAGE_SIZE = 12; // 12 items per page
//   const { page = 1 } = query ?? 1;
//   const where = {
//     public: true,
//     opened: true,
//   };
//   const prisma = new PrismaClient();
//   const openMsg = await prisma.capsule.findMany({
//     skip: PAGE_SIZE * (page - 1),
//     take: PAGE_SIZE,
//     where,
//     orderBy: { dateTime: "desc" },
//     include: {
//       user: true,
//       likes: true,
//       comments: true,
//     },
//   });

//   const totalMessages = await prisma.capsule.count({ where });
//   const totalPages = Math.floor(totalMessages / PAGE_SIZE + 1);
//   const data = openMsg?.map<Capsule[]>(
//     (item) => JSON.parse(JSON.stringify(item)) as Capsule[]
//   );
//   return { props: { data, totalPages } };
// };

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Message to the future - digital time capsules.</title>
        <meta
          name="description"
          content="This website will be soon available"
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="animate-gradient-y bg-gradient-to-r from-green-700 from-10% via-sky-600 via-30% to-emerald-500 to-90%">
        <Hero />
        <TimeCapsuleForm />
        <MessageGrid />
      </main>
    </>
  );
};

export default HomePage;
