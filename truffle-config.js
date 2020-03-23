const fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');

let mnemonic;
try {
  mnemonic = fs.readFileSync('.secret').toString().trim();
} catch {
  mnemonic = 'INVALID';
}

module.exports = {
  networks: {
    rskTestnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://public-node.testnet.rsk.co'),
      network_id: 31,
      gasPrice: 60000000
    }
  }
};
