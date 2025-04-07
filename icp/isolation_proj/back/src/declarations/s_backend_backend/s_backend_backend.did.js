export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'add_task' : IDL.Func([IDL.Text], [IDL.Nat64], []),
    'delete_task' : IDL.Func([IDL.Nat64], [IDL.Bool], []),
    'get_tasks' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Text))],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
