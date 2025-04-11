module gas_tracker::gas_tracker {
    use std::signer;

    struct Message has key, store {
        content: vector<u8>,
    }

    // Store a message (consumes storage gas)
    public entry fun store(account: &signer, msg: vector<u8>) {
        assert!(!exists<Message>(signer::address_of(account)), 1);
        move_to(account, Message { content: msg });
    }

    // Remove the message (triggers refund)
    public entry fun remove(account: &signer) acquires Message {
        assert!(exists<Message>(signer::address_of(account)), 2);
        let Message { content: _ } = move_from<Message>(signer::address_of(account));
    }

    // Read the message
    public fun get(account: address): vector<u8> acquires Message {
        borrow_global<Message>(account).content
    }
}
