// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ReentrancyVulnerable {
    mapping(address => uint256) public balances;

    // Deposit ETH
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    // Vulnerable Withdraw
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "Nothing to withdraw");

        // Transfer before state change
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        balances[msg.sender] = 0;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
