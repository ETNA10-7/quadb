// import { Actor, HttpAgent } from "@dfinity/agent";
// import { idlFactory } from "./declarations/voting_backend/voting_backend.did";
// export { idlFactory } from "./declarations/voting_backend/voting_backend.did";

// const canisterId = import.meta.env.VITE_CANISTER_ID_VOTING_BACKEND;

// const agent = new HttpAgent();
// if (import.meta.env.VITE_DFX_NETWORK !== "ic") {
//   agent.fetchRootKey().catch(console.error);
// }

// export const voting_backend = Actor.createActor(idlFactory, {
//   agent,
//   canisterId,
// });
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./declarations/voting_backend";
import type { _SERVICE } from "./declarations/voting_backend/voting_backend.did";
//import { canisterId } from "./declarations/voting_backend";

const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;


const agent = new HttpAgent();

// Allow fetching root key in local development
if (import.meta.env.VITE_DFX_NETWORK !== "ic") {
  agent.fetchRootKey().catch(console.error);
}

// Create an actor with type safety
export const voting_backend = Actor.createActor<_SERVICE>(idlFactory, {
  agent,
  canisterId,
});
