import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Proposal {
  'id' : bigint,
  'owner' : string,
  'description' : string,
  'is_active' : boolean,
}
export interface Votes {
  'reject' : number,
  'pass' : number,
  'approve' : number,
  'voted_users' : Array<string>,
}
export interface _SERVICE {
  'close_proposal' : ActorMethod<[bigint], undefined>,
  'create_proposal' : ActorMethod<[string], bigint>,
  'get_all_data' : ActorMethod<[], [Array<Proposal>, Array<[bigint, Votes]>]>,
  'get_results' : ActorMethod<[bigint], [] | [Votes]>,
  'vote' : ActorMethod<[bigint, string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
