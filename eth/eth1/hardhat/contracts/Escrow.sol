// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Escrow {
    address public payer;
    address public payee;
    uint256 public amount;
    bool public released;

    constructor(address _payee) payable {
        payer = msg.sender;
        payee = _payee;
        amount = msg.value;
        released = false;
    }

    function release() public {
        require(msg.sender == payer, "Only payer can release funds");
        require(!released, "Funds already released");

        released = true;
        payable(payee).transfer(amount);
    }
}
