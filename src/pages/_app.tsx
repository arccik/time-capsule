import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Header />

      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
};





export default api.withTRPC(MyApp);
