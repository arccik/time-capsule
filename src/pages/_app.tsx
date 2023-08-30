import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Header from "~/components/ui/Header";
import Footer from "~/components/ui/Footer";
import CookieConsent from "~/components/ui/CookieConsent";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <CookieConsent />
    </SessionProvider>
  );
};





export default api.withTRPC(MyApp);
