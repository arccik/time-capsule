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
      <main
        className="bg-base-500 flex flex-col items-center"
        style={{
          backgroundImage: "url('/images/know-about.jpeg')",
          backgroundSize: "cover",
        }}
      >
        <TimeCapsuleForm />
        <CapsuleFooter />
      </main>
    </>
  );
};

export default Home;
