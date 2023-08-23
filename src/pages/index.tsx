import type { NextPage } from "next";
import Head from "next/head";

import TimeCapsuleForm from "~/components/form";
import Hero from "~/components/form/Hero";
import ScrollToTop from "~/components/ui/ScrollToTop";
import MessageGrid from "~/components/open-messages/MessageGrid";

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
      <main className="bg-gradient-to-r from-green-700 from-10% via-sky-600 via-30% to-emerald-500 to-90%">
        <Hero />
        <TimeCapsuleForm />
        <MessageGrid />
        <ScrollToTop />
      </main>
    </>
  );
};

export default HomePage;
