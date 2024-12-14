import { AppProps } from "next/app";
import "@/styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" sizes="32x32" href="favicon.ico" />
        <title>AI Playground</title>
        <meta
          name="description"
          content="AI Playgroundは、GPT-4o、o1、Gemini 1.5 Pro、Claude 3.5 SonnetなどのAIをすべて無制限に無料で使用できるサイトです。"
        />
        <meta property="og:title" content="AI Playground" />
        <meta
          property="og:description"
          content="AI Playgroundは、GPT-4o、o1、Gemini 1.5 Pro、Claude 3.5 SonnetなどのAIをすべて無制限に無料で使用できるサイトです。"
        />
        <meta property="og:image" content="https://ai.raic.dev/card.png" />
        <meta property="og:url" content="https://ai.raic.dev/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@raic_dev" />
        <meta name="twitter:title" content="AI Playground" />
        <meta
          name="twitter:description"
          content="AI Playgroundは、GPT-4o、o1、Gemini 1.5 Pro、Claude 3.5 SonnetなどのAIをすべて無制限に無料で使用できるサイトです。"
        />
        <meta name="twitter:image" content="https://ai.raic.dev/card.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
