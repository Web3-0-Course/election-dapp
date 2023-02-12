## 👷‍♀️ Election Decentralised Application with React.js and Ethereum

### About the smart contract

* Our Smart Contract created three candidates on execution through constructor.
<br />
* You can't call ```addCandidate()``` publicly. So only contract owner can add new candidates. 😁
<br />
* To test the smart contract , please change the addCandidate function's visibility and uncomment the commented testcase of addCandidate in ```test/Election.js file```.
<br />
* ```hardhat.config.js``` file have two types of network add in. 
<br />
```
* Goerli 

* Localhost ```

### 📨 Compile the Smart Contract

```
npx hardhat compile
```

### 💻 Test the contract

```
npx hardhat test 

```



### 🚀 Deploy Contract on localhost or Goerli network


```
npx hardhat run scripts/deploy.js --network localhost

or 

npx hardhat run scripts/deploy.js --network goerli

```

**Consider updating contract address in ```client/src/config.js``` file on every re-deployment if your contract address changes tbh**