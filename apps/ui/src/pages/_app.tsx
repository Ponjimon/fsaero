import { AppProps } from 'next/app';
import { CSSReset } from '@chakra-ui/react';
import { Chakra } from '../containers/Chakra';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <CSSReset />
      <Component {...pageProps} />
    </Chakra>
  );
}

export { getServerSideProps } from '../containers/Chakra';

export default CustomApp;
