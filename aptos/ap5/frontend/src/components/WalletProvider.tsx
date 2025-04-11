// import { ReactNode } from "react";
// //import { AptosWalletAdapterProvider, PetraWallet } from "@aptos-labs/wallet-adapter-react";
// import { AptosWalletAdapterProvider, Petra } from "@aptos-labs/wallet-adapter-react";
// //import { PetraWallet } from "@aptos-labs/wallet-adapter-petra";
// //import { MartianWallet } from "@aptos-labs/wallet-adapter-martian";

// export const WalletProvider = ({ children }: { children: ReactNode }) => {
//   //const wallets = [new PetraWallet(), new MartianWallet()];
//   const wallets = [new Petra()];
//   return (
//     <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
//       {children}
//     </AptosWalletAdapterProvider>
//   );
// };
// import { ReactNode } from "react";
// import { AptosWalletAdapterProvider, Petra } from "@aptos-labs/wallet-adapter-react";
// import {  MartianWallet } from "aptos-wallet-adapter";

// export const WalletProvider = ({ children }: { children: ReactNode }) => {
//   const wallets = [new Petra(), new MartianWallet()];
//   return (
//     <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
//       {children}
//     </AptosWalletAdapterProvider>
//   );
// };

// import { ReactNode } from "react";
// import { AptosWalletAdapterProvider, Network } from "@aptos-labs/wallet-adapter-react";
// import { PetraWallet, MartianWallet } from "aptos-wallet-adapter";

// const wallets = [new PetraWallet(), new MartianWallet()];

// export const WalletProvider = ({ children }: { children: ReactNode }) => {
//   return (
//     <AptosWalletAdapterProvider
//       plugins={wallets}
//       autoConnect={true}
//       optInWallets={["Petra", "Martian"]}
//       dappConfig={{
//         network: Network.DEVNET, // or MAINNET, DEVNET
//         aptosApiKey: "", // Optional unless you want to use the SDK's rate-limited endpoints
//       }}
//       onError={(err) => console.error("Wallet Error:", err)}
//     >
//       {children}
//     </AptosWalletAdapterProvider>
//   );
// };

