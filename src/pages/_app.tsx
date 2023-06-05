import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Header from "~/components/layout/Header";
import { type ReactElement } from "react";
import { type NextPage } from "next";
import Loader from "~/components/layout/Loader";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Header />
      {/* <Auth> */}
      <Component {...pageProps} />
      {/* </Auth> */}
    </SessionProvider>
  );
};

// function Auth({ children }: { children: ReactElement<Element, NextPage> }) {
//   // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
//   const { status } = useSession({ required: true });

//   if (status === "loading") {
//     return <Loader />;
//   }

//   return children;
// }



export default api.withTRPC(MyApp);
