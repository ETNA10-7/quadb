export const idlFactory = ({ IDL }) => {
  const Proposal = IDL.Record({
    'id' : IDL.Nat64,
    'owner' : IDL.Text,
    'description' : IDL.Text,
    'is_active' : IDL.Bool,
  });
  const Votes = IDL.Record({
    'reject' : IDL.Nat32,
    'pass' : IDL.Nat32,
    'approve' : IDL.Nat32,
    'voted_users' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'close_proposal' : IDL.Func([IDL.Nat64], [], []),
    'create_proposal' : IDL.Func([IDL.Text], [IDL.Nat64], []),
    'get_all_data' : IDL.Func(
        [],
        [IDL.Vec(Proposal), IDL.Vec(IDL.Tuple(IDL.Nat64, Votes))],
        ['query'],
      ),
    'get_results' : IDL.Func([IDL.Nat64], [IDL.Opt(Votes)], ['query']),
    'vote' : IDL.Func([IDL.Nat64, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
