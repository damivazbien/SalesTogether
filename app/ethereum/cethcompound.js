import web3 from './web3';
import ABI from './build/contracts/CEthereum.json';


const instance = new web3.eth.Contract(
    ABI.abi,
    '0xd6801a1dffcd0a410336ef88def4320d6df1883e'
);


export default instance;