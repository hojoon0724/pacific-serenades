import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import WaveBg from '@/components/WaveBg';
import Footer from '@/sections/Footer';
import NavBar from '@/sections/NavBar';

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      {/* <> */}
      <NavBar />
      <Component {...pageProps} />
      <Footer />
      {/* </> */}
    </NextUIProvider>
  );
}
