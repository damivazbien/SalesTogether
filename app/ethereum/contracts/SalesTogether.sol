// SPDX-License-Identifier: MIT
pragma solidity ^0.5.12;

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
    uint public _revealCount;
    string _title;
    string _description;
    address[] public signalsSender;

    
    modifier restricted() {
        require(msg.sender == _manager);
        _;
    }
   
    constructor(uint signalPrice, address creator, string memory title, string memory description) public {
        _manager = creator;
        _signalPrice = signalPrice;
        _title = title;
        _description = description;

    }
    
    function fundCampaign() public payable {
        _fundCampaign = msg.value;
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
        _revealCount++;
        
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

    //get summary of this sales campaign
    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            _fundCampaign,
            address(this).balance,
            _signals.length,
            _revealCount,
            _manager
        );
    }

    //get amount of signals send
    function getSignalsCount() public view returns (uint) {
        return _signals.length;
    }

}
