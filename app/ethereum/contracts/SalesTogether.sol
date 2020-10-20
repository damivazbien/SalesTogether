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

interface CEth {
    function mint() external payable;

    function exchangeRateCurrent() external returns (uint256);

    function supplyRatePerBlock() external returns (uint256);

    function redeem(uint) external returns (uint);

    function redeemUnderlying(uint) external returns (uint);
}

/** 
 * @title SalesTogether
 * @dev implements share signals to one sales campaign
 */
contract SalesTogether {
    event MyLog(string, uint256);
     
    struct Signal {
        string title;
        string description;
        address payable provaider;
        bool pay;
    }
    
    Signal[] private _signals;
    address public _manager;
    uint public _signalPrice;
    uint public _fundCampaign;
    address[] public signalsSender;
    
    modifier restricted() {
        require(msg.sender == _manager);
        _;
    }
   
    constructor(uint signalPrice, address creator) public {
        _manager = creator;
        _signalPrice = signalPrice;

    }
    
    function fundCampaign() public payable {
        _fundCampaign = msg.value;
    }
    
    function supplyEthToCompound(address payable _cEtherContract)
        public
        payable
        returns (bool)
    {
        // Create a reference to the corresponding cToken contract
        CEth cToken = CEth(_cEtherContract);

        // Amount of current exchange rate from cToken to underlying
        uint256 exchangeRateMantissa = cToken.exchangeRateCurrent();
        emit MyLog("Exchange Rate (scaled up by 1e18): ", exchangeRateMantissa);

        // Amount added to you supply balance this block
        uint256 supplyRateMantissa = cToken.supplyRatePerBlock();
        emit MyLog("Supply Rate: (scaled up by 1e18)", supplyRateMantissa);

        cToken.mint.value(msg.value).gas(250000)();
        return true;
    }
    
    //create Signal to share in the campaign
    function createSignal(string memory title, string memory description,  address payable provaider) public {
        Signal memory newSignal = Signal({
            title: title,
            description: description,
            provaider: provaider,
            pay : false
        });
        
        _signals.push(newSignal);
        
    }
    
    //approve signal to see compete message. It will pay the price to the signal address (sender)
    function approveSignal(uint index) public restricted {
        Signal storage mysignal = _signals[index];
        
        require( mysignal.pay != true);
        mysignal.pay = true;
        mysignal.provaider.transfer(_signalPrice);
        
    }
    
    //show the details of one signal that was paid before
    function revealSignal(uint index) public restricted view returns (string memory, string memory, address, bool) {
        Signal storage mysignal = _signals[index];

        if(mysignal.pay == true){
            return (
                mysignal.title,
                mysignal.description,
                mysignal.provaider,
                mysignal.pay
            );
        }
        else
        {
            return (
                mysignal.title,
                "Must to pay first to see data",
                mysignal.provaider,
                mysignal.pay
            );
        }
        
    }
    
    //get signals without description
    function getSignals(uint index) public view returns (string memory, address, bool) {
        Signal storage mysignal = _signals[index];
        
        return (
                mysignal.title,
                mysignal.provaider,
                mysignal.pay
            );
    }    
}
