// SPDX-License-Identifier: MIT
pragma solidity ^0.5.12;

interface Erc20 {
    function approve(address, uint256) external returns (bool);

    function transfer(address, uint256) external returns (bool);

    function transferFrom(address src, address dst, uint amount) external returns (bool);
}

interface CErc20 {
    function mint(uint256) external returns (uint256);

    function exchangeRateCurrent() external returns (uint256);

    function supplyRatePerBlock() external returns (uint256);

    function redeem(uint) external returns (uint);

    function redeemUnderlying(uint) external returns (uint);
}

interface CEth {
    function mint() external payable;

    function exchangeRateCurrent() external returns (uint256);

    function supplyRatePerBlock() external returns (uint256);

    function redeem(uint) external returns (uint);

    function redeemUnderlying(uint) external returns (uint);

    function approve(address, uint256) external returns (bool);

    function transfer(address, uint256) external returns (bool);

    function transferFrom(address src, address dst, uint amount) external returns (bool);
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
    address payable public _manager;
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

   
    constructor(uint signalPrice, address payable creator, string memory title, string memory description) public {
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
    function approveSignal(uint index, address payable _cEtherContract) public restricted {
        // Create a reference to the corresponding cToken contract
        CEth cToken = CEth(_cEtherContract);

        Signal storage mysignal = _signals[index];
        
        require( mysignal.pay != true);
        mysignal.pay = true;
        //mysignal.provaider.transfer(_signalPrice);

        // Approve transfer on the ERC20 contract
        cToken.approve(_cEtherContract, _signalPrice);
        
        cToken.transferFrom(address(this), mysignal.provaider, _signalPrice);
        
        _revealCount++;
    }
    
    //show the details of one signal that was paid before
    function revealSignal(uint index) public view returns (string memory, string memory, address, bool) {
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

    function supplyErc20ToCompound(
        address _erc20Contract,
        address _cErc20Contract,
        uint256 _numTokensToSupply
    ) public returns (uint) {
        // Create a reference to the underlying asset contract, like DAI.
        Erc20 underlying = Erc20(_erc20Contract);

        // Create a reference to the corresponding cToken contract, like cDAI
        CErc20 cToken = CErc20(_cErc20Contract);

        // Amount of current exchange rate from cToken to underlying
        uint256 exchangeRateMantissa = cToken.exchangeRateCurrent();
        emit MyLog("Exchange Rate (scaled up by 1e18): ", exchangeRateMantissa);

        // Amount added to you supply balance this block
        uint256 supplyRateMantissa = cToken.supplyRatePerBlock();
        emit MyLog("Supply Rate: (scaled up by 1e18)", supplyRateMantissa);

        // Approve transfer on the ERC20 contract
        underlying.approve(_cErc20Contract, _numTokensToSupply);

        // Mint cTokens
        uint mintResult = cToken.mint(_numTokensToSupply);
        return mintResult;
    }

    function redeemCErc20Tokens(
        uint256 amount,
        bool redeemType,
        address _cErc20Contract        
    ) public returns (bool) {
        // Create a reference to the corresponding cToken contract, like cDAI
        CErc20 cToken = CErc20(_cErc20Contract);

        // `amount` is scaled up by 1e18 to avoid decimals

        uint256 redeemResult;

        if (redeemType == true) {
            // Retrieve your asset based on a cToken amount
            redeemResult = cToken.redeem(amount);
        } else {
            // Retrieve your asset based on an amount of the asset
            redeemResult = cToken.redeemUnderlying(amount);
        }

        // Error codes are listed here:
        // https://compound.finance/developers/ctokens#ctoken-error-codes
        emit MyLog("If this is not 0, there was an error", redeemResult);

        return true;
    }

    function redeemCEth(
        uint256 amount,
        bool redeemType,
        address _cEtherContract
    ) public returns (bool) {
        // Create a reference to the corresponding cToken contract
        CEth cToken = CEth(_cEtherContract);

        // `amount` is scaled up by 1e18 to avoid decimals

        uint256 redeemResult;

        if (redeemType == true) {
            // Retrieve your asset based on a cToken amount
            redeemResult = cToken.redeem(amount);
        } else {
            // Retrieve your asset based on an amount of the asset
            redeemResult = cToken.redeemUnderlying(amount);
        }

        // Error codes are listed here:
        // https://compound.finance/docs/ctokens#ctoken-error-codes
        emit MyLog("If this is not 0, there was an error", redeemResult);
        _manager.transfer(address(this).balance);

        return true;
    }

    // This is needed to receive ETH when calling `redeemCEth`
    function() external payable {}

}
