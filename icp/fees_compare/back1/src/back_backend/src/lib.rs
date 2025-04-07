use ic_cdk::storage;
use ic_cdk::{query, update};
use candid::{CandidType, Deserialize};
use std::cell::RefCell;
use std::collections::VecDeque;
use ic_cdk::api::stable::{stable_size, stable_grow, stable_write};
use ic_cdk::api::canister_balance128;

type TransactionId = u64;

#[derive(CandidType, Deserialize, Clone)]
struct Transaction {
    id: TransactionId,
    user: String,
    timestamp: u64,
}

#[derive(CandidType, Deserialize, Clone)]
struct TransactionWithCycles {
    transaction: Transaction,
    memory_bytes_used: u64,
    storage_bytes_used: u64,
    cycles_used: u128, // ✅ Track cycles used for stable storage
}

// Persistent storage (Stable)
thread_local! {
    static TRANSACTIONS: RefCell<Vec<TransactionWithCycles>> = RefCell::new(vec![]);
}

// In-Memory storage (Temporary)
thread_local! {
    static RECENT_TRANSACTIONS: RefCell<VecDeque<TransactionWithCycles>> = RefCell::new(VecDeque::new());
}

// Global transaction counter
thread_local! {
    static TX_COUNTER: RefCell<TransactionId> = RefCell::new(0);
}

// Function to measure cycles before and after execution
fn measure_cycles<F>(operation: F) -> u128
where
    F: FnOnce(),
{
    let cycles_before = canister_balance128();
    operation();
    let cycles_after = canister_balance128();
    cycles_before.saturating_sub(cycles_after)
}

// ✅ **Temporary Storage Function (In-Memory)**
#[update]
fn store_in_memory(user: String) -> TransactionId {
    let tx_id = TX_COUNTER.with(|count| {
        let new_id = *count.borrow() + 1;
        *count.borrow_mut() = new_id;
        new_id
    });

    let transaction = Transaction {
        id: tx_id,
        user,
        timestamp: ic_cdk::api::time(),
    };

    RECENT_TRANSACTIONS.with(|tx| {
        let mut recent = tx.borrow_mut();
        if recent.len() >= 10 {
            recent.pop_front();
        }
        recent.push_back(TransactionWithCycles {
            transaction: transaction.clone(),
            memory_bytes_used: 0, // In-memory, so no storage cost
            storage_bytes_used: 0,
            cycles_used: 0, // ✅ Temporary storage does NOT burn cycles
        });
    });

    ic_cdk::println!("🟢 Transaction {} stored in memory (temporary)", tx_id);

    tx_id
}

// ✅ **Permanent Storage Function (Stable Memory)**
#[update]
fn store_in_stable_memory(user: String) -> TransactionId {
    let tx_id = TX_COUNTER.with(|count| {
        let new_id = *count.borrow() + 1;
        *count.borrow_mut() = new_id;
        new_id
    });

    let transaction = Transaction {
        id: tx_id,
        user,
        timestamp: ic_cdk::api::time(),
    };

    // ✅ Force stable memory growth if needed
    let stable_memory_before = stable_size() as u64;
    if stable_memory_before == 0 {
        stable_grow(1).expect("Failed to grow stable memory");
    }

    // ✅ Convert transaction into bytes (force stable memory usage)
    //let data = format!("Transaction {} by {}", tx_id, user);
    let data = format!("Transaction {} by {}", tx_id, user.clone());

    let data_bytes = data.as_bytes();
    let stable_offset = (stable_memory_before * 64 * 1024) as u64;

    let cycles_used = measure_cycles(|| {
        stable_write(stable_offset, data_bytes); // ✅ Fixed, no `.expect()`
    });
    
    let stable_memory_after = stable_size() as u64;
    let storage_bytes_used = data_bytes.len() as u64;

    // ✅ Store transaction in heap memory for query access
    TRANSACTIONS.with(|tx| {
        tx.borrow_mut().push(TransactionWithCycles {
            transaction: transaction.clone(),
            memory_bytes_used: 0, // Heap memory is not tracked
            storage_bytes_used,
            cycles_used,
        });
    });

    ic_cdk::println!(
        "🟢 Transaction {} stored permanently: Stable Memory Used = {} bytes, Cycles Used = {}",
        tx_id, storage_bytes_used, cycles_used
    );

    tx_id
}

#[query]
fn get_transactions() -> Vec<TransactionWithCycles> {
    TRANSACTIONS.with(|tx| tx.borrow().clone())
}

#[query]
fn get_recent_transactions() -> Vec<TransactionWithCycles> {
    RECENT_TRANSACTIONS.with(|tx| tx.borrow().iter().cloned().collect())
}

// Stable Storage Persistence
#[ic_cdk::pre_upgrade]
fn pre_upgrade() {
    TRANSACTIONS.with(|tx| {
        let transactions = tx.borrow().clone();
        storage::stable_save((transactions,)).expect("Failed to save transactions");
    });
}

#[ic_cdk::post_upgrade]
fn post_upgrade() {
    TRANSACTIONS.with(|tx| {
        if let Ok((stored_tx,)) = storage::stable_restore::<(Vec<TransactionWithCycles>,)>() {
            *tx.borrow_mut() = stored_tx;
        }
    });
}

// Export candid for frontend integration
ic_cdk::export_candid!();
