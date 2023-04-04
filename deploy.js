const HDWalletProvider = require('@truffle/hdwallet-provider');
const { interfaces } = require('mocha');
const Web3 = require('web3');

const { abi, evm } = require('./compile');

provider = new HDWalletProvider(
  'fantasy worth disease various primary village improve remain enjoy please worth portion',
  'https://goerli.infura.io/v3/9ebac35ac6be4223a4a8387c3f09943e'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(abi);
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
