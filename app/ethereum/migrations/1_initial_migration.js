const SalesFactory = artifacts.require("/home/mrnobody/github/SalesTogether/app/ethereum/contracts/SalesFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(SalesFactory);
};
