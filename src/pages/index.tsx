import { type NextPage } from "next";
import Head from "next/head";
import CapsuleFooter from "~/components/capsule-form/CapsuleFooter";

import TimeCapsuleForm from "~/components/capsule-form/TimeCapsuleForm";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Message to the future</title>
        <meta
          name="description"
          content="This website will be soon available"
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="flex flex-col items-center bg-gradient-to-b from-[#9069f9] to-[#692e76]">
        <TimeCapsuleForm />
        <CapsuleFooter />
      </main>
    </>
  );
};

export default Home;
