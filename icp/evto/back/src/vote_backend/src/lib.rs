use ic_cdk::storage;
use candid::{CandidType, Deserialize};
use std::collections::HashMap;
use std::cell::RefCell;

type ProposalId = u64;

#[derive(CandidType, Deserialize, Clone)]
struct Proposal {
    id: ProposalId,
    description: String,
    is_active: bool,
    owner: String, // Owner as String for compatibility
}

#[derive(CandidType, Deserialize, Clone)]
struct Votes {
    approve: u32,
    reject: u32,
    pass: u32,
    voted_users: Vec<String>, // Storing Principal as String for TypeScript compatibility
}

#[derive(CandidType, Deserialize, Clone)]
struct VotingState {
    proposals: HashMap<ProposalId, Proposal>,
    votes: HashMap<ProposalId, Votes>,
}

thread_local! {
    static VOTING_STATE: RefCell<VotingState> = RefCell::new(VotingState {
        proposals: HashMap::new(),
        votes: HashMap::new(),
    });
}

// Generate a unique Proposal ID
fn generate_unique_id() -> ProposalId {
    VOTING_STATE.with(|state| {
        let state = state.borrow();
        state.proposals.keys().max().unwrap_or(&0) + 1
    })
}

// Create a proposal
#[ic_cdk::update]
fn create_proposal(description: String) -> ProposalId {
    let owner = ic_cdk::caller().to_text(); // Convert Principal to String
    let id = generate_unique_id();

    VOTING_STATE.with(|state| {
        let mut state = state.borrow_mut();
        let proposal = Proposal {
            id,
            description,
            is_active: true,
            owner,
        };
        state.proposals.insert(id, proposal);
        state.votes.insert(id, Votes {
            approve: 0,
            reject: 0,
            pass: 0,
            voted_users: vec![],
        });
    });

    id
}

// Cast a vote
#[ic_cdk::update]
fn vote(proposal_id: ProposalId, choice: String) {
    VOTING_STATE.with(|state| {
        let mut state = state.borrow_mut();
        if let Some(proposal) = state.proposals.get(&proposal_id) {
            if !proposal.is_active {
                ic_cdk::trap("Proposal is no longer active!");
            }

            let caller = ic_cdk::caller().to_text();
            if let Some(votes) = state.votes.get_mut(&proposal_id) {
                if votes.voted_users.contains(&caller) {
                    ic_cdk::trap("You have already voted!");
                }
                match choice.as_str() {
                    "approve" => votes.approve += 1,
                    "reject" => votes.reject += 1,
                    "pass" => votes.pass += 1,
                    _ => ic_cdk::trap("Invalid vote choice!"),
                }
                votes.voted_users.push(caller);
            }
        } else {
            ic_cdk::trap("Proposal not found!");
        }
    });
}

// Close a proposal (mark as inactive)
//Add like on Close it Should get deleted...
#[ic_cdk::update]
fn close_proposal(proposal_id: ProposalId) {
    VOTING_STATE.with(|state| {
        let mut state = state.borrow_mut();
        if let Some(proposal) = state.proposals.get_mut(&proposal_id) {
            proposal.is_active = false;
        } else {
            ic_cdk::trap("Proposal not found!");
        }
    });
}

// Get votes for a specific proposal
#[ic_cdk::query]
fn get_results(proposal_id: ProposalId) -> Option<Votes> {
    VOTING_STATE.with(|state| {
        state.borrow().votes.get(&proposal_id).cloned()
    })
}

// Get all proposals and their votes
#[ic_cdk::query]
fn get_all_data() -> (Vec<Proposal>, Vec<(ProposalId, Votes)>) {
    VOTING_STATE.with(|state| {
        let state = state.borrow();
        (
            state.proposals.values().cloned().collect(),
            state.votes.iter().map(|(&id, v)| (id, v.clone())).collect(),
        )
    })
}

// Save state before upgrade
#[ic_cdk::pre_upgrade]
fn pre_upgrade() {
    VOTING_STATE.with(|state| {
        storage::stable_save((state.borrow().proposals.clone(), state.borrow().votes.clone()))
            .unwrap();
    });
}

// Restore state after upgrade
#[ic_cdk::post_upgrade]
fn post_upgrade() {
    VOTING_STATE.with(|state| {
        if let Ok((proposals, votes)) = storage::stable_restore::<(HashMap<ProposalId, Proposal>, HashMap<ProposalId, Votes>)>() {
            state.borrow_mut().proposals = proposals;
            state.borrow_mut().votes = votes;
        }
    });
}

// Export Candid Interface
ic_cdk::export_candid!();

