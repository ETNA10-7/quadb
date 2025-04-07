export const idlFactory = ({ IDL }) => {
  const Votes = IDL.Record({
    'reject' : IDL.Nat32,
    'pass' : IDL.Nat32,
    'approve' : IDL.Nat32,
    'voted_users' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'create_proposal' : IDL.Func([IDL.Text], [IDL.Nat64], []),
    'get_results' : IDL.Func([IDL.Nat64], [IDL.Opt(Votes)], ['query']),
    'vote' : IDL.Func([IDL.Nat64, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
