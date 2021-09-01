import { AppProps } from 'next/app';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default CustomApp;
