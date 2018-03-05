//the contract we are exporting from this file has two properties
	// the interface, or ABI
	// byte code, raw contract

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');

const source = fs.readFileSync(inboxPath, 'utf8');

// console.log(solc.compile(source,1)); //2nd argument is number of contracts

//bytecode is the actual code on the blockchain
//interface details the functions that can be called, and stored variables


module.exports = solc.compile(source,1).contracts[':Inbox'];
//exports just the bytecode and the interface