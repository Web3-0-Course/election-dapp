const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Election Contract", function(){
    // we define a fixture to resue same setupin every test case
    async function deployElectionFixture(){
        const election = await ethers.getContractFactory("Election");
        const [addr1, addr2,addr3] = await ethers.getSigners();
        
        const electionContract = await election.deploy();
        await electionContract.deployed();

        console.log("There should be no probs in deploying : ", electionContract.address);
        console.log('Address  of first candidate : ', addr0.address);
        console.log('Address  of second candidate ', addr2.address);
        console.log('Address of third candidate ', addr3.address);

        return { electionContract, addr1, addr2, addr3 };

    }

    // nested describe calls
    describe("Add new candidate", function(){
        // for this test change addCandidate() function to public 
        it("Should add a candidate correctly", async () => {
            // get the candidate count before adding a candidate
            const { electionContract } = await loadFixture(deployElectionFixture);

            await electionContract.addCandidate("Mamata Benarjii");

            let currentCandidateCount = await electionContract.candidatesCount();
            expect(currentCandidateCount.toNumber()).to.equal(1);
         
        });
    });

    describe("Unique Voters", function(){
        it("Should not allow a user to vote twice", async () => {
            // vote for a candiate
            // 
            const { electionContract} = await loadFixture(deployElectionFixture);
            // 2 is the candidateId for addr3
            await electionContract.vote(3);


            // now try to revote again with addr2
            try {
                await electionContract.vote(3);
            } catch (error){
                //console.error(error);
                // assert that the error is thrown
                expect(error.message).to.contain("Voter has already voted");
            }
        });

    });

    describe("Invalid Candidate", function(){
        it("should not allow a user to vote for an invalid candidate", async () => {
            const { electionContract } = await loadFixture(deployElectionFixture);
            try {
               await electionContract.vote(8);    
            } catch (error) {
                //console.error(error);
                // assert that error is thrown
                expect(error.message).to.contain("Invalid Candidate ID");
            }
        });
    });

});