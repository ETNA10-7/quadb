module strt::counter {
    use std::signer;

    struct Counter has key {
        value: u64,
    }

    public fun init(account: &signer) {
        move_to(account, Counter { value: 0 });
    }

    public fun increment(account: &signer) acquires Counter {
        let counter = borrow_global_mut<Counter>(signer::address_of(account));
        counter.value = counter.value + 1;
    }

    public fun get(account: address): u64 acquires Counter {
        let counter = borrow_global<Counter>(account);
        counter.value
    }
}
