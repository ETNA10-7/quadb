"use client";
import React, { useState, useEffect } from "react";
import { contractABI, contractAddress } from "../utils/constants";
import { ethers } from "ethers";

const MemoryStorage = () => {
  const [storedText, setStoredText] = useState("");
  const [inputText, setInputText] = useState("");
  const [memoryText, setMemoryText] = useState("");
  const [contract, setContract] = useState(null);
  const [gasMemory, setGasMemory] = useState("");
  const [gasStorage, setGasStorage] = useState("");

  async function connectWallet() {
    if (!window.ethereum) return alert("Please install MetaMask");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contractInstance);

      console.log("Connected to contract:", contractAddress);
      fetchStoredText(contractInstance);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  }

  async function fetchStoredText(contractInstance) {
    try {
      const text = await contractInstance.storedText();
      setStoredText(text);
    } catch (error) {
      console.error("Error fetching stored text:", error);
    }
  }

  async function estimateGasMemory() {
    if (!contract) return;
    try {
      const estimatedGas = await contract.updateWithMemory.estimateGas(inputText);
      setGasMemory(ethers.formatUnits(estimatedGas, "gwei") + " GWEI");
      console.log("Estimated Gas for Memory:", estimatedGas.toString());
    } catch (error) {
      console.error("Error estimating gas for Memory:", error);
    }
  }

  async function estimateGasStorage() {
    if (!contract) return;
    try {
      const estimatedGas = await contract.updateWithStorage.estimateGas(inputText);
      setGasStorage(ethers.formatUnits(estimatedGas, "gwei") + " GWEI");
      console.log("Estimated Gas for Storage:", estimatedGas.toString());
    } catch (error) {
      console.error("Error estimating gas for Storage:", error);
    }
  }

  async function updateWithMemory() {
    if (!contract) return alert("Connect wallet first");

    try {
      const result = await contract.updateWithMemory(inputText);
      setMemoryText(result);
      estimateGasMemory();
    } catch (error) {
      console.error("Error in updateWithMemory:", error);
    }
  }

  async function updateWithStorage() {
    if (!contract) return alert("Connect wallet first");

    try {
      const tx = await contract.updateWithStorage(inputText);
      await tx.wait();
      fetchStoredText(contract);
      estimateGasStorage();
      setInputText("");
    } catch (error) {
      console.error("Error in updateWithStorage:", error);
    }
  }

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-4">Blockchain Storage</h2>
      <p className="mb-2">Stored Text: <strong>{storedText || "No text stored yet"}</strong></p>
      <p className="mb-2">Memory Output: <strong>{memoryText || "No memory text"}</strong></p>

      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter new text"
        className="border p-2 rounded mr-2"
      />

      <button onClick={updateWithMemory} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
        Test Memory
      </button>
      
      <button onClick={updateWithStorage} className="bg-blue-500 text-white px-4 py-2 rounded">
        Store on Blockchain
      </button>

      <div className="mt-4">
        <p>⚡ <strong>Memory Gas Cost:</strong> {gasMemory || "Not estimated yet"}</p>
        <p>🔥 <strong>Storage Gas Cost:</strong> {gasStorage || "Not estimated yet"}</p>
      </div>
    </div>
  );
};

export default MemoryStorage;
