// SPDX-License-Identifier: MIT

pragma solidity ^0.5.12;

contract SalesFactory {
    SalesTogether[] public deployedSales;
    
    function createSales(uint signalPrice) public {
        SalesTogether newSales = new SalesTogether(signalPrice, msg.sender);
        deployedSales.push(newSales);
    }
    
    function getDeployedSales() public view returns (SalesTogether[] memory){
        return deployedSales;
    }
    
   
}