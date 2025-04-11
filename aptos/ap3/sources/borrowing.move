module lender::borrowing {
    use std::signer;
    use lender::lending;

    struct BorrowedFunds has key {
        amount: u64,
    }

    entry fun init(account: &signer) {
        assert!(!exists<BorrowedFunds>(signer::address_of(account)), 1);
        move_to(account, BorrowedFunds { amount: 0 });
    }

    entry fun borrow(account: &signer, lender_address: address, amount: u64) acquires BorrowedFunds {
        let success = lending::lend(lender_address, amount);
        assert!(success, 2);

        let user = borrow_global_mut<BorrowedFunds>(signer::address_of(account));
        user.amount = user.amount + amount;
    }

    //  Not entry, because it returns u64
    public fun withdraw(account: &signer): u64 acquires BorrowedFunds {
        let user = borrow_global_mut<BorrowedFunds>(signer::address_of(account));
        let amt = user.amount;
        user.amount = 0;
        amt
    }

    entry fun repay(account: &signer, lender_address: address, amount: u64) acquires BorrowedFunds {
        let user = borrow_global_mut<BorrowedFunds>(signer::address_of(account));
        assert!(user.amount >= amount, 3);
        user.amount = user.amount - amount;
        lending::receive_repayment(lender_address, amount);
    }

    //  Not entry, because it returns u64
    public fun get_borrowed(account: &signer): u64 acquires BorrowedFunds {
        let user = borrow_global<BorrowedFunds>(signer::address_of(account));
        user.amount
    }
}
