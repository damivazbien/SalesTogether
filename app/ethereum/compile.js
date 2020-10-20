const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);


const salesTogetherPath = path.resolve(__dirname, 'contracts', 'SalesTogether.sol');
const source = fs.readFileSync(salesTogetherPath, 'utf8');


var input = {
    language: 'Solidity',
    sources: {
      ['SalesTogether.sol']: {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };

const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
    let allWarnings = true;
    output.errors.forEach((potentiallyAnError) => {
      if (potentiallyAnError.type !== 'Warning') allWarnings = false;
    });
  
    console.error(output.errors);
  
    if (!allWarnings) {
      console.error('BUILD FAILED, EXITING.');
      process.exit(1);
    }
}

const myContractOutput = output.contracts['SalesTogether.sol']['SalesTogether'];
const bytecode = myContractOutput.evm.bytecode.object;
const abi = myContractOutput.abi;

const myFactoryContractOutput = output.contracts['SalesTogether.sol']['SalesFactory'];
const bytecodeFactory = myFactoryContractOutput.evm.bytecode.object;
const abiFactory = myFactoryContractOutput.abi;




fs.mkdir('./.build/', { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating a build directory', err);
      console.error('BUILD FAILED, EXITING.');
      process.exit(1);
    }
  });
  
fs.writeFileSync('./.build/bytecode.json', JSON.stringify({ bytecode }));
fs.writeFileSync('./.build/abi.json', JSON.stringify(abi));

fs.writeFileSync('./.build/bytecodeFactory.json', JSON.stringify({ bytecodeFactory }));
fs.writeFileSync('./.build/abiFactory.json', JSON.stringify(abiFactory));

// const output =  JSON.parse(solc.compile(JSON.stringify(input)));

// if(output.errors) {
//     output.errors.forEach(err => {
//         console.log(err.formattedMessage);
//     });
// } else {
//     const contracts = output.contracts["SalesTogether.sol"];
//     for (let contractName in contracts) {
//         const contract = contracts[contractName];
//         console.log(contract);
//         fs.outputFileSync(
//             path.resolve(buildPath, `${contractName}.json`),
//             JSON.stringify(contract), 'utf8');
//     }
// }