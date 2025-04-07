import React, { useEffect, useState } from "react";
import { voting_backend } from "./icp";

// Define Proposal and Votes types
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
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const proposalIds = Object.keys(votes).map((id) => parseInt(id, 10));
      const fetchedProposals = await Promise.all(
        proposalIds.map(async (id) => {
          const voteDataRaw = await voting_backend.get_results(BigInt(id)); // Convert to BigInt
          const voteData: Votes | null = Array.isArray(voteDataRaw)
            ? voteDataRaw[0] || null
            : voteDataRaw ?? null;

          if (voteData) {
            setVotes((prevVotes) => ({
              ...prevVotes,
              [id]: voteData,
            }));
          }

          return {
            id,
            description: `Proposal ${id}`,
            is_active: true,
            owner: "Unknown",
          };
        })
      );

      setProposals(fetchedProposals);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    }
  };

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
    } catch (error) {
      console.error("Error creating proposal:", error);
    }
  };

  const voteOnProposal = async () => {
    if (selectedProposal === null || !voteChoice) return;
    try {
      await voting_backend.vote(BigInt(selectedProposal), voteChoice);
      alert("Vote cast successfully!");
      fetchProposals();
    } catch (error) {
      console.error("Error voting:", error);
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
        <button onClick={createProposal}>Submit</button>
      </div>

      <div>
        <h2>Vote on Proposals</h2>
        {proposals.length > 0 ? (
          proposals.map((proposal) => (
            <div key={proposal.id}>
              <h3>{proposal.description}</h3>
              <p>Owner: {proposal.owner}</p>
              <p>Status: {proposal.is_active ? "Active" : "Closed"}</p>
              <button onClick={() => setSelectedProposal(proposal.id)}>
                Vote
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