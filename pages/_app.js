import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </RecoilRoot>
  );
};

export default MyApp;
