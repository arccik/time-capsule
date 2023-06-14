import { type NextPage } from "next";
import Head from "next/head";

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
        className="bg-base-500 bg-[ flex flex-col items-center"
        style={{
          // backgroundImage: "url('/images/know-about.jpeg')",
          // backgroundSize: "cover",
          backgroundColor: " rgb(20,146,244)",
          background:
            "linear-gradient(114deg, rgba(20,146,244,1) 0%, rgba(192,0,255,0.552608735380117) 100%)",
        }}
      >
        <TimeCapsuleForm />
      </main>
    </>
  );
};

export default Home;
