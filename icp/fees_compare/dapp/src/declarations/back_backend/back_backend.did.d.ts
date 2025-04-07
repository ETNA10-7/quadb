import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Transaction {
  'id' : bigint,
  'user' : string,
  'timestamp' : bigint,
  'gas_fee' : bigint,
}
export interface TransactionWithCycles {
  'transaction' : Transaction,
  'cycles_used' : bigint,
}
export interface _SERVICE {
  'get_recent_transactions' : ActorMethod<[], Array<TransactionWithCycles>>,
  'get_transactions' : ActorMethod<[], Array<TransactionWithCycles>>,
  'record_transaction' : ActorMethod<[string, bigint], bigint>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
