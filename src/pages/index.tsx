import { Capsule, PrismaClient } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";

import TimeCapsuleForm from "~/components/capsule-form";
import Hero from "~/components/capsule-form/Hero";
import MessageGrid from "~/components/open-capsule/MessageGrid";

export const getServerSideProps = async ({
  query,
}: {
  query: { page?: number };
}) => {
  const { page = 1 } = query;
  const where = {
    public: true,
    opened: true,
  };
  const prisma = new PrismaClient();
  const openMsg = await prisma.capsule.findMany({
    skip: 12 * (page - 1),
    take: 12,
    where,
    orderBy: { dateTime: "desc" },
    include: {
      user: true,
      likes: true,
      comments: true,
    },
  });
  const totalMessages = await prisma.capsule.count({ where });
  const totalPages = Math.floor(totalMessages / 12 + 1);
  const data = openMsg?.map((item) => JSON.parse(JSON.stringify(item)));
  return { props: { data, totalPages } };
};

const HomePage: NextPage<{ data: Capsule[]; totalPages: number }> = ({
  data,
  totalPages,
}) => {
  console.log("Home Page : ", data);
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
        <MessageGrid data={data} totalPages={totalPages} />
      </main>
    </>
  );
};

export default HomePage;
