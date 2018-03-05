const assert = require('assert');
const ganache = require('ganache-cli'); //local test network
const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());

//these two lines below are used to get around a versioning issue
const provider = ganache.provider();
const web3 = new Web3(provider);    

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const initialString = 'Hi there';

beforeEach(async ()=>{
	//get a list of all accounts
	accounts = await web3.eth.getAccounts() //returns ten accounts which are great for testing use one of those accounts to deploy the contract

	// Create a new contract
	inbox = await new web3.eth.Contract(JSON.parse(interface)) //Teaches web3 about what methods an Inbox contract has
	.deploy({ 
		data: bytecode, 
		arguments: [initialString] 
		}) //Tells web3 that we want to deploy a new copy of this contract
	.send( {
		from: accounts[0], 
		gas: '1000000' 
		}); // Instructs web3 to send out a transaction that creates this contract

	//the line below is used to reconcile a versioning issue
	inbox.setProvider(provider);

	// the variable 'inbox' is a javascript object representation of the contract, so we can interact with it accordingly
});

describe('Inbox',() =>{
	it('deploys a contract',() => {
		assert.ok(inbox.options.address); //is the address property on the options property
	});

	it('default message set',async ()=>{
		const message = await inbox.methods.message().call()
		assert.equal(message, initialString); 
	}); // needs to be an async function because a promise is returned by the message method

	it('can change the message',async ()=>{
		var newMessage = 'new message';
		await inbox.methods.setMessage(newMessage).send({ from:accounts[0] });
		const message = await inbox.methods.message().call();
		assert.equal(message, newMessage); 
	});
});





//web3
	// web3 is the end all solution for interfacing between js and ethereum
	//there are two groups of versions out there
		// v0.x.x	the vast majority of documentation is for this
		// v1.x.x	this is what we are using, supports async and await

//we are making instances of Web3

//Provider
	//communication layer between the web3 library and the ethereum network
	//every provider has an identical library of methods that allow web3 to talk to ganache
	// web3 always requires a provider

//Ganache is what we will be using



//Mocha
	// test running framework
	// general purpose testing framework
	//three functinos that we need to understand
		//it           run and individual assertiong on something we are trying to test
		//describe     used to group it functions together, purely organizational
		//beforeEach   used to abstract some logic that is similar to all our tests



//Mocha Example=========================================================
// class Car{
// 	park(){
// 		return 'stopped';
// 	}

// 	drive(){
// 		return 'vroom';
// 	}
// }

// let car;

// beforeEach(()=>{
// 	 car = new Car();
// })
// describe('Car',() => {

// 	it('can park',()=>{
// 		assert.equal(car.park(),'stopped');
// 	});

// 	it('can drive',()=>{
// 		assert.equal(car.drive(),'vroom');
// 	});

// });  //(used for organizational purposes, another function)

