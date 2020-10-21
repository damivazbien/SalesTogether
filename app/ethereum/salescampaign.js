import web3 from './web3';
import ABI from './build/contracts/SalesTogether.json';

export default (address) => {
    return new web3.eth.Contract(
        ABI.abi,
        address
    );
};
