const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
	'your 12 word meta mask seed here',
	'your Infura Rinkeby API adress here'
	);

const web3 = new Web3(provider);

const deploy = async () => {
	//get list of accounts available through the HD wallet
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account: ', accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(interface)) //interface is the ABI
	.deploy({ data: bytecode, arguments: ['Hello World!'] })
	.send({gas: '1000000', from: accounts[0] });

	console.log('Contract deployed to: ' + result.options.address);
};

deploy();