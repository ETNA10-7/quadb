module borrower::borrowing {
    use std::signer;
    use lender::lending;

    struct BorrowedFunds has key {
        amount: u64,
    }

    public fun init(account: &signer) {
        assert!(!exists<BorrowedFunds>(signer::address_of(account)), 1);
        move_to(account, BorrowedFunds { amount: 0 });
    }

    public fun borrow(account: &signer, amount: u64) acquires BorrowedFunds {
        let success = lending::lend(amount);
        assert!(success, 2);

        let user = borrow_global_mut<BorrowedFunds>(signer::address_of(account));
        user.amount = user.amount + amount;
    }

    public fun withdraw(account: &signer): u64 acquires BorrowedFunds {
        let user = borrow_global_mut<BorrowedFunds>(signer::address_of(account));
        let amt = user.amount;
        user.amount = 0;
        amt
    }

    public fun repay(account: &signer, amount: u64) acquires BorrowedFunds {
        let user = borrow_global_mut<BorrowedFunds>(signer::address_of(account));
        assert!(user.amount >= amount, 3);
        user.amount = user.amount - amount;
        lending::receive_repayment(amount);
    }

    public fun get_borrowed(account: address): u64 acquires BorrowedFunds {
        let user = borrow_global<BorrowedFunds>(account);
        user.amount
    }
}
