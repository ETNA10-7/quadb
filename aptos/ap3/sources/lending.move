module lender::lending {
    use std::signer;

    struct LendingPool has key {
        balance: u64,
    }

    //  Can be called from CLI
    entry fun init(account: &signer, initial_funds: u64) {
        assert!(!exists<LendingPool>(signer::address_of(account)), 1);
        move_to(account, LendingPool { balance: initial_funds });
    }

    //  Cannot be entry because it returns a value
    public fun get_balance(account: &signer): u64 acquires LendingPool {
        borrow_global<LendingPool>(signer::address_of(account)).balance
    }

    public fun lend(account: address, amount: u64): bool acquires LendingPool {
        let pool = borrow_global_mut<LendingPool>(account);
        if (pool.balance >= amount) {
            pool.balance = pool.balance - amount;
            true
        } else {
            false
        }
    }

    public fun receive_repayment(account: address, amount: u64) acquires LendingPool {
        let pool = borrow_global_mut<LendingPool>(account);
        pool.balance = pool.balance + amount;
    }
}
