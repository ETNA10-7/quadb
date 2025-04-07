import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./declarations/back_backend";

//import { Actor, HttpAgent } from "@dfinity/agent";
//import { idlFactory } from "./declarations/s_backend_backend/s_backend_backend.did.js";

// Load canister ID from environment variables
export const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;

const agent = new HttpAgent({
  host: "http://127.0.0.1:4943", // Make sure this matches your dfx replica host
});

// Ensure root key for local development
if (import.meta.env.VITE_DFX_NETWORK !== "ic") {
  agent.fetchRootKey().catch((err) => {
    console.warn("Unable to fetch root key. Is dfx running?");
    console.error(err);
  });
}

// Create actor instance
const backend = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

export default backend;


// import { Actor, HttpAgent } from "@dfinity/agent";
// import { idlFactory } from "./declarations/back_backend"; // Ensure the correct path

// // Load environment variables
// const LOCAL_IC_HOST = "http://127.0.0.1:4943"; // Default for local dfx
// const IC_HOST = import.meta.env.VITE_IC_HOST || LOCAL_IC_HOST;
// const BACKEND_CANISTER_ID = import.meta.env.VITE_BACKEND_CANISTER_ID;

// if (!BACKEND_CANISTER_ID) {
//   throw new Error("❌ VITE_BACKEND_CANISTER_ID is not set in the .env file.");
// }

// // Create an ICP Agent
// const agent = new HttpAgent({ host: IC_HOST });

// // Fetch root key for local development (skip on mainnet)
// if (import.meta.env.VITE_DFX_NETWORK !== "ic") {
//   agent.fetchRootKey().catch((err) => {
//     console.warn("⚠️ Warning: Could not fetch root key. Is dfx running?");
//     console.error(err);
//   });
// }

// // Create the backend actor instance
// const icp_backend = Actor.createActor(idlFactory, {
//   agent,
//   canisterId: BACKEND_CANISTER_ID,
// });

// export default icp_backend;

