// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract Election {

    // model a candidate
    struct Candidate {
        uint id;
        string name;
        uint256 voteCount;
    }

    // store votes 
    mapping(address => uint) public votes;

    // store accounts that have voted
    mapping(address => bool) public voters; 

    // store candidates 
    mapping(uint => Candidate) public candidates;

    // store candidate count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    function addCandidate (string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);

    }

    constructor() {
        addCandidate("Arvind Kejriwal");
        addCandidate("Narendra Modi");
        addCandidate("Rahul Gandhi");
        console.log("Number of candidates : ",candidatesCount);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender],"Voter has already voted");

        // limit the number of votes cast by an address to 1
        require(votes[msg.sender] == 0);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount,"Invalid Candidate ID");

        // record that voter has voted
        voters[msg.sender] = true;
        votes[msg.sender] ++;

        //update candidate vote count
        candidates[_candidateId].voteCount ++;

        // trigger voted count;
        emit votedEvent(_candidateId);
    } 
}