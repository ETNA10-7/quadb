// 1

//se candid::{CandidType, Deserialize};
// use std::cell::RefCell;
// use std::collections::HashMap;

// thread_local! {
//     static TODOS: RefCell<HashMap<u64, String>> = RefCell::new(HashMap::new());
//     static NEXT_ID: RefCell<u64> = RefCell::new(0);
// }

// /// Add a new to-do item.
// #[ic_cdk::update]
// fn add_task(task: String) -> u64 {
//     NEXT_ID.with(|id| {
//         TODOS.with(|todos| {
//             let mut todos = todos.borrow_mut();
//             let mut next_id = id.borrow_mut();
//             let task_id = *next_id;
//             todos.insert(task_id, task);
//             *next_id += 1;
//             task_id
//         })
//     })
// }

// /// Get all to-do items.
// #[ic_cdk::query]
// fn get_tasks() -> Vec<(u64, String)> {
//     TODOS.with(|todos| todos.borrow().clone().into_iter().collect())
// }

// /// Delete a to-do item.
// #[ic_cdk::update]
// fn delete_task(task_id: u64) -> bool {
//     TODOS.with(|todos| todos.borrow_mut().remove(&task_id).is_some())
// }

// // Export Candid Interface
// ic_cdk::export_candid!();


// 2

// use candid::{CandidType, Deserialize};
// use ic_cdk::{init, post_upgrade, pre_upgrade};
// use ic_cdk::storage::{stable_restore, stable_save};
// use std::collections::HashMap;
// //use serde

// #[derive(CandidType, Deserialize, Default)]
// struct TodoStore {
//     todos: HashMap<u64, String>,
//     next_id: u64,
// }

// // Global variable for temporary storage (inside canister memory)
// static mut TODO_STORE: Option<TodoStore> = None;

// /// Initialize the storage when the canister starts.
// #[init]
// fn init() {
//     unsafe {
//         TODO_STORE = Some(TodoStore::default());
//     }
// }

// /// Save data before canister upgrade.
// #[pre_upgrade]
// fn pre_upgrade() {
//     unsafe {
//         if let Some(store) = &TODO_STORE {
//             stable_save((store,)).expect("Failed to save data before upgrade");
//         }
//     }
// }

// /// Restore data after canister upgrade.
// #[post_upgrade]
// fn post_upgrade() {
//     unsafe {
//         TODO_STORE = stable_restore::<(TodoStore,)>().ok().map(|(store,)| Some(store)).unwrap_or(Some(TodoStore::default()));
//     }
// }

// /// Get a mutable reference to the store.
// fn get_store() -> &'static mut TodoStore {
//     unsafe { TODO_STORE.as_mut().expect("Store not initialized") }
// }

// /// Add a new to-do item.
// #[ic_cdk::update]
// fn add_task(task: String) -> u64 {
//     let store = get_store();
//     let task_id = store.next_id;
//     store.todos.insert(task_id, task);
//     store.next_id += 1;
//     task_id
// }

// /// Get all to-do items.
// #[ic_cdk::query]
// fn get_tasks() -> Vec<(u64, String)> {
//     let store = get_store();
//     store.todos.clone().into_iter().collect()
// }

// /// Delete a to-do item.
// #[ic_cdk::update]
// fn delete_task(task_id: u64) -> bool {
//     let store = get_store();
//     store.todos.remove(&task_id).is_some()
// }

// // Export Candid Interface
// ic_cdk::export_candid!();

use candid::{CandidType, Deserialize};
use ic_cdk::{init, post_upgrade, pre_upgrade};
use ic_cdk::storage::{stable_restore, stable_save};
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Default)]
struct TodoStore {
    todos: HashMap<u64, String>,
    next_id: u64,
}

// Use `RefCell<TodoStore>` instead of `static mut`
thread_local! {
    static TODO_STORE: RefCell<TodoStore> = RefCell::new(TodoStore::default());
}

/// Initialize the canister.
#[init]
fn init() {
    TODO_STORE.with(|store| {
        *store.borrow_mut() = TodoStore::default();
    });
}

/// Save data before canister upgrade.
#[pre_upgrade]
fn pre_upgrade() {
    TODO_STORE.with(|store| {
        stable_save((&*store.borrow(),)).expect("Failed to save data before upgrade");
    });
}

/// Restore data after canister upgrade.
#[post_upgrade]
fn post_upgrade() {
    TODO_STORE.with(|store| {
        let restored_store: Option<(TodoStore,)> = stable_restore().ok();
        *store.borrow_mut() = restored_store.map(|(s,)| s).unwrap_or_default();
    });
}

/// Add a new to-do item.
#[ic_cdk::update]
fn add_task(task: String) -> u64 {
    TODO_STORE.with(|store| {
        let mut store = store.borrow_mut();
        let task_id = store.next_id;
        store.todos.insert(task_id, task);
        store.next_id += 1;
        task_id
    })
}

/// Get all to-do items.
// #[ic_cdk::query]
// fn get_tasks() -> Vec<(u64, String)> {
//     TODO_STORE.with(|store| store.borrow().todos.clone().into_iter().collect())
// }

#[ic_cdk::query]
fn get_tasks() -> Vec<(u64, String)> {
    let mut tasks: Vec<(u64, String)> = TODO_STORE.with(|store| {
        store.borrow().todos.clone().into_iter().collect()
    });

    // Sort tasks by their ID (ascending order)
    tasks.sort_by_key(|task| task.0);
    
    tasks
}



/// Delete a to-do item.
// #[ic_cdk::update]
// fn delete_task(task_id: u64) -> bool {
//     TODO_STORE.with(|store| store.borrow_mut().todos.remove(&task_id).is_some())
// }

#[ic_cdk::update]
fn delete_task(task_id: u64) -> bool {
    TODO_STORE.with(|store| {
        let mut store = store.borrow_mut();
        
        // Remove the task and check if it was present
        let removed = store.todos.remove(&task_id).is_some();
        
        // Reset `next_id` if all tasks are deleted
        if store.todos.is_empty() {
            store.next_id = 0;
        }

        removed
    })
}


// Export Candid Interface
ic_cdk::export_candid!();
