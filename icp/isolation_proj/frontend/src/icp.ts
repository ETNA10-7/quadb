// import { Actor, HttpAgent } from "@dfinity/agent";
// import { idlFactory } from "./declarations/s_backend_backend";

// // Set up the correct backend canister ID
// export const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID || "your-default-canister-id";

// // Create an ICP Agent
// const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });

// if (import.meta.env.MODE !== "production") {
//   agent.fetchRootKey().catch((err) => {
//     console.warn("Unable to fetch root key. Is dfx running?");
//     console.error(err);
//   });
// }

// // Create an actor to interact with the backend canister
// const icp_backend = Actor.createActor(idlFactory, { agent, canisterId });

// export default icp_backend;

import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./declarations/s_backend_backend/s_backend_backend.did.js";

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
const icp_backend = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

export default icp_backend;

