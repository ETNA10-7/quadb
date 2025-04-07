import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'add_task' : ActorMethod<[string], bigint>,
  'delete_task' : ActorMethod<[bigint], boolean>,
  'get_tasks' : ActorMethod<[], Array<[bigint, string]>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
