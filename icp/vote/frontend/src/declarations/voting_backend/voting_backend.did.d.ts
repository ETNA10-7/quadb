import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Votes {
  'reject' : number,
  'pass' : number,
  'approve' : number,
  'voted_users' : Array<string>,
}
export interface _SERVICE {
  'create_proposal' : ActorMethod<[string], bigint>,
  'get_results' : ActorMethod<[bigint], [] | [Votes]>,
  'vote' : ActorMethod<[bigint, string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
