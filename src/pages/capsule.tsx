import { type NextPage } from "next";
import Head from "next/head";
import Footer from "~/components/capsule-form/CapsuleFooter";
import Hero from "~/components/capsule-form/CapsulePageHero";

import TimeCapsuleForm from "~/components/capsule-form/TimeCapsuleForm";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Time Capsule Online</title>
        <meta
          name="description"
          content="This website will be soon available"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center bg-gradient-to-b from-[#76452e] to-[#55716f]">
        <Hero />
        <TimeCapsuleForm />
        <Footer />
      </main>
    </>
  );
};

export default Home;
