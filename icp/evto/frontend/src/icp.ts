import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./declarations/vote_backend";
import type { _SERVICE } from "./declarations/vote_backend/vote_backend.did";
//import { canisterId } from "./declarations/voting_backend";

const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;


const agent = new HttpAgent({
    host: "http://127.0.0.1:4943", // Make sure this matches your dfx replica host
  });

// Allow fetching root key in local development
if (import.meta.env.VITE_DFX_NETWORK !== "ic") {
  agent.fetchRootKey().catch(console.error);
}

// Create an actor with type safety
export const voting_backend = Actor.createActor<_SERVICE>(idlFactory, {
  agent,
  canisterId,
});
