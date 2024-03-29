import type { NextPage } from "next";
import Head from "next/head";

import TimeCapsuleForm from "~/components/form";
import Hero from "~/components/ui/Hero";
import ScrollToTop from "~/components/ui/ScrollToTop";
import MessageGrid from "~/components/open-messages/MessageGrid";
import Script from "next/script";

const metaDataDescription =
  "Welcome to MessageTTF (Message to the Future), a platform that allows you to send messages, images, and audio recordings to yourself, relatives, friends, or family members. ";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Message to the future - digital time capsules.</title>

        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={metaDataDescription} key="desc" />
        <meta
          property="og:title"
          content="MessageTTF (Message to the Future)"
        />
        <meta property="og:description" content={metaDataDescription} />
        <meta property="og:image" content="/images/logo.png" />
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
      {/* <main className="bg-gradient-to-r from-green-700 from-10% via-sky-600 via-30% to-emerald-500 to-90%"> */}
      {/* <main className="bg-[#c0e2fe] bg-cover bg-fixed bg-no-repeat text-black md:bg-[url('/images/bg-green.png')] "> */}
      <main className="animate-gradient-x bg-gradient-to-r from-cyan-500 to-blue-500 p-3">
        <div className="mx-auto lg:max-w-[2000px]">
          <Hero />
          <TimeCapsuleForm />
          <MessageGrid />
          <ScrollToTop />
        </div>
      </main>
    </>
  );
};

export default HomePage;
