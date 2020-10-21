// SPDX-License-Identifier: MIT
pragma solidity ^0.5.12;

import "./SalesTogether.sol";

contract SalesFactory {
    address[] public deployedSales;
    
    function createSales(uint signalPrice, string memory title, string memory description) public {
        SalesTogether newSales = new SalesTogether(signalPrice, msg.sender, title, description);
        deployedSales.push(address(newSales));
    }
    
    function getDeployedSales() public view returns (address[] memory){
        return deployedSales;
    } 

}