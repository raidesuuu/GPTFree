import { AppProps } from "next/app";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <link rel="icon" sizes="32x32" href="favicon.ico" />
      <title>AI Playground</title>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
