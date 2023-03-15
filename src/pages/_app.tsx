import { useEffect } from "react";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { themeChange } from "theme-change";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import moment from "moment";
import { GERMAN_LOCALE_DEFINITIONS } from "~/utils/moment";
import toast, { ToastBar, Toaster } from "react-hot-toast";

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
      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            className: "alert alert-success w-max",
          },
          error: {
            className: "alert alert-error w-max",
          },
          loading: {
            className: "alert alert-info w-max",
          },
        }}
      />
      ;
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
