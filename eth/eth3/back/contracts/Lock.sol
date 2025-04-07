// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageVsMemory {
    string public storedText; // Persistent storage on blockchain

    // Event for logging updates
    event TextUpdated(string newText);

    // This function does NOT modify storedText (it's just a test)
    function updateWithMemory(string memory newText) public pure returns (string memory) {
        return newText;
    }

    // Updates storedText permanently on blockchain
    function updateWithStorage(string memory newText) public {
        storedText = newText;
        emit TextUpdated(newText);
    }

    // Returns the storedText (explicit getter)
    function getStoredText() public view returns (string memory) {
        return storedText;
    }
}
//asdgdgdid