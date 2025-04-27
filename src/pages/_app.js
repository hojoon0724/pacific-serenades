import Footer from "@/sections/Footer";
import NavBar from "@/sections/NavBar";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <NavBar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </NextUIProvider>
  );
}
