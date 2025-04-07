export const idlFactory = ({ IDL }) => {
  const Transaction = IDL.Record({
    'id' : IDL.Nat64,
    'user' : IDL.Text,
    'timestamp' : IDL.Nat64,
    'gas_fee' : IDL.Nat64,
  });
  const TransactionWithCycles = IDL.Record({
    'transaction' : Transaction,
    'cycles_used' : IDL.Nat,
  });
  return IDL.Service({
    'get_recent_transactions' : IDL.Func(
        [],
        [IDL.Vec(TransactionWithCycles)],
        ['query'],
      ),
    'get_transactions' : IDL.Func(
        [],
        [IDL.Vec(TransactionWithCycles)],
        ['query'],
      ),
    'record_transaction' : IDL.Func([IDL.Text, IDL.Nat64], [IDL.Nat64], []),
  });
};
export const init = ({ IDL }) => { return []; };
