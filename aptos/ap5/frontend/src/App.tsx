// //import { useWallet } from "@aptos-labs/aptos-wallet-adapter-react";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
// import { AptosClient } from "aptos";
// import { useState } from "react";

// const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");
// const MODULE_NAME = "gas_tracker"; // Change to your module name
// const MODULE_ADDRESS = "<your_module_address>"; // Replace this

// function App() {
//   const { account, connected, connect, disconnect, signAndSubmitTransaction } = useWallet();
//   const [msg, setMsg] = useState("");
//   const [gasUsed, setGasUsed] = useState<number | null>(null);

//   const storeMessage = async () => {
//     if (!account) return;
//     const payload = {
//       type: "entry_function_payload",
//       function: `${MODULE_ADDRESS}::${MODULE_NAME}::store`,
//       type_arguments: [],
//       arguments: [Array.from(new TextEncoder().encode(msg))],
//     };
//     const tx = await signAndSubmitTransaction(payload);
//     const res = await client.waitForTransactionWithResult(tx.hash);
//     setGasUsed(res.gas_used);
//     console.log("Gas Used:", res.gas_used);
//   };

//   const removeMessage = async () => {
//     if (!account) return;
//     const payload = {
//       type: "entry_function_payload",
//       function: `${MODULE_ADDRESS}::${MODULE_NAME}::remove`,
//       type_arguments: [],
//       arguments: [],
//     };
//     const tx = await signAndSubmitTransaction(payload);
//     const res = await client.waitForTransactionWithResult(tx.hash);
//     setGasUsed(res.gas_used);
//     console.log("Gas Used (with refund):", res.gas_used);
//   };

//   return (
//     <div style={{ padding: 30 }}>
//       <h1>Aptos Gas Tracker</h1>
//       {!connected ? (
//         <button onClick={connect}>Connect Wallet</button>
//       ) : (
//         <div>
//           <p>Connected: {account?.address}</p>
//           <button onClick={disconnect}>Disconnect</button>
//         </div>
//       )}

//       <div style={{ marginTop: 20 }}>
//         <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Enter message" />
//         <button onClick={storeMessage}>Store</button>
//         <button onClick={removeMessage} style={{ marginLeft: 10 }}>Remove</button>
//       </div>

//       {gasUsed !== null && <p>Last Txn Gas Used: {gasUsed}</p>}
//     </div>
//   );
// }

// export default App;

// import { useWallet } from "@aptos-labs/wallet-adapter-react";
// import { AptosClient } from "aptos";
// import { useState } from "react";

// const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");
// const MODULE_NAME = "gas_tracker";
// const MODULE_ADDRESS = "<your_module_address>"; // Replace this

// function App() {
//   const { account, connected, connect, disconnect, signAndSubmitTransaction, wallet } = useWallet();
//   const [msg, setMsg] = useState("");
//   const [gasUsed, setGasUsed] = useState<number | null>(null);

//   const storeMessage = async () => {
//     if (!account) return;
//     const payload = {
//       type: "entry_function_payload",
//       function: `${MODULE_ADDRESS}::${MODULE_NAME}::store`,
//       type_arguments: [],
//       arguments: [Array.from(new TextEncoder().encode(msg))],
//     };
//     const tx = await signAndSubmitTransaction(payload);
//     const res = await client.waitForTransactionWithResult(tx.hash);
//     setGasUsed(res.gas_used);
//   };

//   const removeMessage = async () => {
//     if (!account) return;
//     const payload = {
//       type: "entry_function_payload",
//       function: `${MODULE_ADDRESS}::${MODULE_NAME}::remove`,
//       type_arguments: [],
//       arguments: [],
//     };
//     const tx = await signAndSubmitTransaction(payload);
//     const res = await client.waitForTransactionWithResult(tx.hash);
//     setGasUsed(res.gas_used);
//   };

//   return (
//     <div style={{ padding: 30 }}>
//       <h1>Aptos Gas Tracker</h1>
//       {!connected ? (
//         <button onClick={() => connect(wallet?.name)}>Connect Wallet</button>
//       ) : (
//         <div>
//           <p>Connected: {account?.address}</p>
//           <button onClick={disconnect}>Disconnect</button>
//         </div>
//       )}

//       <div style={{ marginTop: 20 }}>
//         <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Enter message" />
//         <button onClick={storeMessage}>Store</button>
//         <button onClick={removeMessage} style={{ marginLeft: 10 }}>Remove</button>
//       </div>

//       {gasUsed !== null && <p>Last Txn Gas Used: {gasUsed}</p>}
//     </div>
//   );
// }

// export default App;


// import  { useState } from "react";
// import { AptosClient } from "aptos";
// import {
//   AptosWalletAdapterProvider,
//   useWallet,
//   Network,
  
// } from "@aptos-labs/wallet-adapter-react";
// import { SomeAptosWallet } from "some-aptos-wallet-package";
// //import { PetraWallet } from "aptos-wallet-adapter"; // or any wallet package you've added

// const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");
// const MODULE_NAME = "gas_tracker";
// const MODULE_ADDRESS = "<your_module_address>"; // replace this

// const InnerApp = () => {
//   const { account, connected, connect, disconnect, signAndSubmitTransaction, wallet } = useWallet();
//   const [msg, setMsg] = useState("");
//   const [gasUsed, setGasUsed] = useState<number | null>(null);

//   const storeMessage = async () => {
//     if (!account) return;
//     const payload = {
//       type: "entry_function_payload",
//       function: `${MODULE_ADDRESS}::${MODULE_NAME}::store`,
//       type_arguments: [],
//       arguments: [Array.from(new TextEncoder().encode(msg))],
//     };
//     const tx = await signAndSubmitTransaction(payload);
//     const res = await client.waitForTransactionWithResult(tx.hash);
//     setGasUsed(res.gas_used);
//   };

//   const removeMessage = async () => {
//     if (!account) return;
//     const payload = {
//       type: "entry_function_payload",
//       function: `${MODULE_ADDRESS}::${MODULE_NAME}::remove`,
//       type_arguments: [],
//       arguments: [],
//     };
//     const tx = await signAndSubmitTransaction(payload);
//     const res = await client.waitForTransactionWithResult(tx.hash);
//     setGasUsed(res.gas_used);
//   };

//   return (
//     <div style={{ padding: 30 }}>
//       <h1>Aptos Gas Tracker</h1>
//       {!connected ? (
//         <button onClick={() => connect(wallet?.name)}>Connect Wallet</button>
//       ) : (
//         <div>
//           <p>Connected: {account?.address}</p>
//           <button onClick={disconnect}>Disconnect</button>
//         </div>
//       )}

//       <div style={{ marginTop: 20 }}>
//         <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Enter message" />
//         <button onClick={storeMessage}>Store</button>
//         <button onClick={removeMessage} style={{ marginLeft: 10 }}>Remove</button>
//       </div>

//       {gasUsed !== null && <p>Last Txn Gas Used: {gasUsed}</p>}
//     </div>
//   );
// };

// const App = () => {
//   //const wallets = [new PetraWallet()];
//   const wallets = [new AptosLegacyStandardWallet()];

//   return (
//     <AptosWalletAdapterProvider
//       plugins={wallets}
//       autoConnect={true}
//       optInWallets={["Petra"]}
//       dappConfig={{ network: Network.TESTNET }}
//     >
//       <InnerApp />
//     </AptosWalletAdapterProvider>
//   );
// };

// export default App;
// import  { useState } from "react";
// import { AptosClient } from "aptos";
// import {
//   AptosWalletAdapterProvider,
//   useWallet,
//   WalletSelector,
//   Network,
// } from "@aptos-labs/wallet-adapter-react";

// // Replace with your actual module values
// const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");
// const MODULE_NAME = "gas_tracker";
// const MODULE_ADDRESS = "<your_module_address>"; // Replace this

// // Inner app where wallet context is used
// function InnerApp() {
//   const { account, connected, disconnect, signAndSubmitTransaction } = useWallet();
//   const [msg, setMsg] = useState("");
//   const [gasUsed, setGasUsed] = useState<number | null>(null);

//   const storeMessage = async () => {
//     if (!account) return;

//     const payload = {
//       type: "entry_function_payload",
//       function: `${MODULE_ADDRESS}::${MODULE_NAME}::store`,
//       type_arguments: [],
//       arguments: [Array.from(new TextEncoder().encode(msg))],
//     };

//     const tx = await signAndSubmitTransaction(payload);
//     const res = await client.waitForTransactionWithResult(tx.hash);
//     setGasUsed(res.gas_used);
//     console.log("Gas Used:", res.gas_used);
//   };

//   const removeMessage = async () => {
//     if (!account) return;

//     const payload = {
//       type: "entry_function_payload",
//       function: `${MODULE_ADDRESS}::${MODULE_NAME}::remove`,
//       type_arguments: [],
//       arguments: [],
//     };

//     const tx = await signAndSubmitTransaction(payload);
//     const res = await client.waitForTransactionWithResult(tx.hash);
//     setGasUsed(res.gas_used);
//     console.log("Gas Used (with refund):", res.gas_used);
//   };

//   return (
//     <div style={{ padding: 30 }}>
//       <h1>Aptos Gas Tracker</h1>

//       <WalletSelector />

//       {connected && (
//         <div style={{ marginTop: 10 }}>
//           <p>Connected as: {account?.address}</p>
//           <button onClick={disconnect}>Disconnect</button>
//         </div>
//       )}

//       <div style={{ marginTop: 20 }}>
//         <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Enter message" />
//         <button onClick={storeMessage}>Store</button>
//         <button onClick={removeMessage} style={{ marginLeft: 10 }}>Remove</button>
//       </div>

//       {gasUsed !== null && <p>Last Txn Gas Used: {gasUsed}</p>}
//     </div>
//   );
// }

// // Main app with wallet provider
// function App() {
//   return (
//     <AptosWalletAdapterProvider
//       autoConnect={true}
//       optInWallets={["Petra"]} // add more if needed
//       dappConfig={{
//         network: Network.TESTNET,
//         aptosApiKey: "", // optional, only if using Aptos SDK cloud API
//       }}
//       onError={(error) => console.log("Wallet error:", error)}
//     >
//       <InnerApp />
//     </AptosWalletAdapterProvider>
//   );
// }

// export default App;

















import React, { useState } from "react";
import { AptosClient } from "aptos";
import {
  AptosWalletAdapterProvider,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";

const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");
const MODULE_NAME = "gas_tracker"; // Replace with your module name
const MODULE_ADDRESS = "0xYourModuleAddress"; // Replace with your deployed module address

function InnerApp() {
  const {
    account,
    connected,
    connect,
    disconnect,
    wallets,
    signAndSubmitTransaction,
  } = useWallet();

  const [msg, setMsg] = useState("");
  const [gasUsed, setGasUsed] = useState<number | null>(null);

  const storeMessage = async () => {
    if (!account) return;

    const data = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::store`,
      type_arguments: [],
      arguments: [msg], // Removed `multisigAddress`
    };

    try {
      const tx = await signAndSubmitTransaction({ data });
      const res: any = await client.waitForTransactionWithResult(tx.hash);
      setGasUsed(res?.gas_used ?? null);
      console.log("Gas Used:", res?.gas_used);
    } catch (err) {
      console.error("Store Error:", err);
    }
  };

  const removeMessage = async () => {
    if (!account) return;

    const data = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::remove`,
      type_arguments: [],
      arguments: [], // Removed `multisigAddress`
    };

    try {
      const tx = await signAndSubmitTransaction({ data });
      const res: any = await client.waitForTransactionWithResult(tx.hash);
      setGasUsed(res?.gas_used ?? null);
      console.log("Gas Used (with refund):", res?.gas_used);
    } catch (err) {
      console.error("Remove Error:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Aptos Gas Tracker</h1>

      {!connected ? (
        <div>
          <p>Select a wallet to connect:</p>
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => connect(wallet.name)}
              style={{ marginRight: "1rem" }}
            >
              Connect to {wallet.name}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <p>Connected as: {account?.address.toString()}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Enter message"
          style={{ padding: "0.5rem", marginRight: "1rem" }}
        />
        <button onClick={storeMessage}>Store</button>
        <button onClick={removeMessage} style={{ marginLeft: "1rem" }}>
          Remove</button>
      </div>

      {gasUsed !== null && (
        <p style={{ marginTop: "1rem" }}>Last Txn Gas Used: {gasUsed}</p>
      )}
    </div>
  );
}

function App() {
  return (
    <AptosWalletAdapterProvider
      autoConnect={false}
      optInWallets={["Petra"]}
      dappConfig={{
        network: "testnet", // Use string instead of `Network.TESTNET`
      }}
      onError={(error) => console.error("Wallet error:", error)}
    >
      <InnerApp />
    </AptosWalletAdapterProvider>
  );
}

export default App;
