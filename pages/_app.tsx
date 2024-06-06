import { ThirdwebProvider, metamaskWallet, coinbaseWallet, walletConnect, phantomWallet,  } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

// This is the chain your dApp will work on.
const activeChain = "polygon";

function MyApp({ Component, pageProps }: AppProps) {
  const customMetamaskWallet = metamaskWallet({recommended:true});
  const customCoinbaseWallet = coinbaseWallet();
  const customPantamWallet = phantomWallet();
  const customWalletConnect = walletConnect();

  return (
    <ThirdwebProvider activeChain={activeChain}
    supportedWallets={[
      customMetamaskWallet,
      customCoinbaseWallet,
      customPantamWallet,
      customWalletConnect
    ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
