import { ChakraProvider } from "@chakra-ui/react";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { AppProps } from "next/app";
import Head from "next/head";

const getLibrary = (
  provider: ExternalProvider | JsonRpcFetchFunc
): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Head>
          <title>Playground</title>
        </Head>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </ChakraProvider>
  );
};

export default App;
