require('dotenv').config();
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { WalletContextProvider } from "../components/providers";
import { theme } from "../theme";

import "./global.css";

export const metadata = {
  title: "Tornado Cash",
  description: "Tornado Cash is a fully decentralized protocol for private transactions on Ethereum.",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <WalletContextProvider>
            {children}
          </WalletContextProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
