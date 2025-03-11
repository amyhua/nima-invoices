import "@/styles/globals.css";
import type { AppProps } from "next/app";

function getStaticProps() {
  return {
    props: {
      title: "Home Page",
    },
  };
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
