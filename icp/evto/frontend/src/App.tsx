import React, { useEffect, useState } from "react";
import { voting_backend } from "./icp";

// Define Proposal and Votes types for type safety
interface Proposal {
  id: number;
  description: string;
  is_active: boolean;
  owner: string;
}

interface Votes {
  approve: number;
  reject: number;
  pass: number;
  voted_users: string[];
}

const App: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [votes, setVotes] = useState<Record<number, Votes>>({});
  const [description, setDescription] = useState("");
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);
  const [voteChoice, setVoteChoice] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  // Fetch proposals and votes together using combined backend method
  const fetchAllData = async () => {
    try {
      const [fetchedProposals, fetchedVotes] = await voting_backend.get_all_data();
      
      setProposals(
        fetchedProposals.map((proposal: any) => ({
          id: Number(proposal.id), // Convert bigint to number
          description: proposal.description,
          is_active: proposal.is_active,
          owner: proposal.owner,
        }))
      );
      

      const votesObj = fetchedVotes.reduce(
        (acc: Record<number, Votes>, [id, voteData]: [bigint, Votes]) => {
          acc[Number(id)] = voteData;
          return acc;
        },
        {}
      );

      setVotes(votesObj);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Create a new proposal
  const createProposal = async () => {
    if (!description) return;
    try {
      const proposalId = await voting_backend.create_proposal(description);
      const proposalIdNumber = Number(proposalId);

      setProposals([
        ...proposals,
        { id: proposalIdNumber, description, is_active: true, owner: "You" },
      ]);
      setDescription("");
      alert("Proposal created successfully!");
    } catch (error) {
      console.error("Error creating proposal:", error);
    }
  };

  // Cast a vote on a proposal
  const voteOnProposal = async () => {
    if (selectedProposal === null || !voteChoice) return;

    try {
      await voting_backend.vote(BigInt(selectedProposal), voteChoice);
      alert("Vote cast successfully!");
      fetchAllData(); // Refresh data after voting
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  // Close a proposal
  const closeProposal = async (id: number) => {
    try {
      await voting_backend.close_proposal(BigInt(id));
      alert("Proposal closed successfully!");
      fetchAllData(); // Refresh data after closing
    } catch (error) {
      console.error("Error closing proposal:", error);
    }
  };

  return (
    <div>
      <h1>ICP Voting dApp</h1>

      <div>
        <h2>Create a Proposal</h2>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter proposal description"
        />
        <button onClick={createProposal}>Submit Proposal</button>
      </div>

      <div>
        <h2>Vote on Proposals</h2>
        {proposals.length > 0 ? (
          proposals.map((proposal) => (
            <div key={proposal.id}>
              <h3>{proposal.description}</h3>
              <p>Owner: {proposal.owner}</p>
              <p>Status: {proposal.is_active ? "Active" : "Closed"}</p>
              {proposal.is_active ? (
                <button onClick={() => setSelectedProposal(proposal.id)}>
                  Vote on Proposal
                </button>
              ) : (
                <button disabled>Proposal Closed</button>
              )}
              <button onClick={() => closeProposal(proposal.id)}>
                Close Proposal
              </button>
            </div>
          ))
        ) : (
          <p>No proposals available.</p>
        )}
      </div>

      {selectedProposal !== null && (
        <div>
          <h2>Cast Your Vote</h2>
          <select
            value={voteChoice}
            onChange={(e) => setVoteChoice(e.target.value)}
          >
            <option value="">Select</option>
            <option value="approve">Approve</option>
            <option value="reject">Reject</option>
            <option value="pass">Pass</option>
          </select>
          <button onClick={voteOnProposal}>Submit Vote</button>
        </div>
      )}

      <div>
        <h2>Results</h2>
        {Object.entries(votes).map(([id, voteData]) => (
          <div key={id}>
            <h3>Proposal {id}</h3>
            <p>Approve: {voteData.approve}</p>
            <p>Reject: {voteData.reject}</p>
            <p>Pass: {voteData.pass}</p>
            <p>Voted Users: {voteData.voted_users.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
