/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require('dotenv').config()

const { API_URL, PRIVATE_KEY } = process.env; 

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks : {
   
    goerli: {
      url : API_URL,
      accounts: [`0x${PRIVATE_KEY}`]

    },
    local : {
      url : `http://127.0.0.1:8545/`,
      accounts: [`0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0`]
    }
  },
};
