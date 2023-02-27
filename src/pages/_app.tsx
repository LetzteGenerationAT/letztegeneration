import { useEffect } from "react";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { themeChange } from "theme-change";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import moment from "moment";
import { GERMAN_LOCALE_DEFINITIONS } from "~/utils/moment";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    // This is to change the theme of the app via daisyUI
    themeChange(false);
  }, []);

  moment.defineLocale("de", GERMAN_LOCALE_DEFINITIONS);

  moment.locale("de");

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
