const main = async () => {
    const election = await ethers.getContractFactory("Election");
    const electionContract = await election.deploy();

    await electionContract.deployed()

    console.log("Election contract deployed on : ", electionContract.address);
     
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);

    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

runMain();