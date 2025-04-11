module lender::lending {
    use std::signer;

    struct LendingPool has key {
        balance: u64,
    }

    public fun init(account: &signer, initial_funds: u64) {
        assert!(!exists<LendingPool>(signer::address_of(account)), 1);
        move_to(account, LendingPool { balance: initial_funds });
    }

    public fun get_balance(): u64 acquires LendingPool {
        borrow_global<LendingPool>(@lender).balance
    }

    public fun lend(amount: u64): bool acquires LendingPool {
        let pool = borrow_global_mut<LendingPool>(@lender);
        if (pool.balance >= amount) {
            pool.balance = pool.balance - amount;
            true
        } else {
            false
        }
    }

    public fun receive_repayment(amount: u64) acquires LendingPool {
        let pool = borrow_global_mut<LendingPool>(@lender);
        pool.balance = pool.balance + amount;
    }
}
