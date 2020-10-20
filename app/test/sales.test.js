const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:8545');


const compiledSalesTogheter = require('../ethereum/.build/abi.json');
//const compiledSalesTogheter = require('../ethereum/build/bytecode.json');
const compiledFactory = require('../ethereum/.build/abiFactory.json');
const compiledbytecodeFactory = require('../ethereum/.build/bytecodeFactory.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    
    factory = await new web3.eth.Contract(compiledFactory)
    .deploy({data: compiledbytecodeFactory.bytecodeFactory, arguments: [] })
    .send({ from: accounts[1], gas: 5000000});

    await factory.methods.createSales(100000).send({
        from: accounts[0],
        gas: '1000000'
    });

    [campaignAddress] = await factory.methods.getDeployedSales().call();
    campaign = await new web3.eth.Contract(
        compiledSalesTogheter,
        campaignAddress
    )
});

describe('Campaigns', () => {
    it('deploys a factory and a sales campaing', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    })

    it ('marks caller as a manager', async () => {
        const manager = await campaign.methods._manager().call();
        console.log(accounts[0]);
        assert.equal(accounts[0], manager);
    });

    it ('Create one Sales campaign, create a signal, aprove and return full description', async () => {
        await campaign.methods.fundCampaign().send({
            value: web3.utils.toWei('1','ether'),
            from: accounts[0]
        });
        const isContributor = await campaign.methods._fundCampaign().call();
        assert(isContributor);

        await campaign.methods.createSignal(
            'Why we are talking about it',
            'this is just for test',
            accounts[1]
        ).send({
            from: accounts[1],
            gas: '1000000'
        });
        const mysignal = await campaign.methods.getSignals(0).call();
        console.log(mysignal);
        assert.equal('Why we are talking about it',mysignal['0']);

        await campaign.methods.approveSignal(0).send({
                from: accounts[0],
                gas: '1000000'
            });
        const mysignalhaschanged = await campaign.methods.getSignals(0).call();
        console.log(mysignalhaschanged);
        assert.equal(true,mysignalhaschanged['2']);

        await campaign.methods.revealSignal(0).send({
            from : accounts[0],
            gas: '1000000'
        });
        const mysignalreveal = await campaign.methods.revealSignal(0).call();
        console.log(mysignalreveal);
        assert.equal('this is just for test', mysignalreveal['1']);
        
    });


})