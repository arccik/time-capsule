import type { NextPage } from "next";
import Head from "next/head";

import TimeCapsuleForm from "~/components/form";
import Hero from "~/components/ui/Hero";
import ScrollToTop from "~/components/ui/ScrollToTop";
import MessageGrid from "~/components/open-messages/MessageGrid";
import Script from "next/script";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Message to the future - digital time capsules.</title>
        <meta
          name="description"
          content="This website will be soon available"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-1R65VE5XQB" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-1R65VE5XQB');
        `}
      </Script>
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
