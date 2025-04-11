module userbal::user_balances {
    use std::signer;
    use std::error;

    struct Balance has key {
        value: u64,
    }

    // Initialize balance to zero for this account
    public fun init(account: &signer) {
        assert!(!exists<Balance>(signer::address_of(account)), error::already_exists(0));
        move_to(account, Balance { value: 0 });
    }

    // Deposit amount into balance
    public fun deposit(account: &signer, amount: u64) acquires Balance {
        let balance = borrow_global_mut<Balance>(signer::address_of(account));
        balance.value = balance.value + amount;
    }

    // Withdraw amount from balance
    public fun withdraw(account: &signer, amount: u64) acquires Balance {
        let balance = borrow_global_mut<Balance>(signer::address_of(account));
        assert!(balance.value >= amount, error::invalid_argument(1));
        balance.value = balance.value - amount;
    }

    // View balance for an address
    public fun get(address: address): u64 acquires Balance {
        let balance = borrow_global<Balance>(address);
        balance.value
    }
}
