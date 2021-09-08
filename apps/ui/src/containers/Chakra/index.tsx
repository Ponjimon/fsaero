import { ChakraProvider } from '@chakra-ui/react';
import { cookieStorageManager, localStorageManager } from '@chakra-ui/system';
import { GetServerSideProps } from 'next';
import React from 'react';
import theme from '../../theme.';

export const Chakra = ({ cookies, children }) => {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManager(cookies)
      : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => ({
  props: {
    cookies: req.headers.cookie ?? '',
  },
});

export default Chakra;
