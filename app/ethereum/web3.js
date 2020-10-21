import Web3 from 'web3';

let web3;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    // We are in the browser and matamask is running.
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    console.log("ya estoy aquí")
 } else {
    // we are on the server Or the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/ccadfe8a778d4ef4abc6884794aaac93'
    );
    web3 = new Web3(provider);
}

export default web3;