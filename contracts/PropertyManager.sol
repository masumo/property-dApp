// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "contracts/TestToken.sol";
import "contracts/SharedStruct.sol";
import "contracts/Property.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PropertyManager is SharedStruct, Ownable {
    TestToken immutable i_testToken;
    Property[] public properties;
    uint256 public fee;
    uint256 public exchangeRatio = 1000; // 1 ETH = 1000 ERC20 tokens
    uint256 public returnPenalty = 10; // 10% penalty for returning tokens
    uint256 public minReturnAmount = 10; // ~0.01 ETH
    event PropertyCreated(address indexed property, address indexed owner);

    constructor(uint256 _fee, TestToken _testToken) {
        fee = _fee;
        i_testToken = _testToken;
    }

    modifier requireFeesPaid() {
        require(
            i_testToken.transferFrom(msg.sender, address(this), fee),
            "Fees not paid"
        );
        _;
    }

    function createNewProperty(
        PropertyAddress memory _propertyAddress,
        PropertyData memory _propertyData,
        PropertyOwnerContact memory _propertyOwnerContact
    ) external requireFeesPaid {
        Property newProperty = new Property(
            _propertyAddress,
            _propertyData,
            _propertyOwnerContact
        );
        properties.push(newProperty);
        newProperty.transferOwnership(msg.sender);
        emit PropertyCreated(address(newProperty), msg.sender);
    }

    function deposit() external payable {
        require(msg.value > 0, "Amount must be greater than zero");
        uint256 exchangeAmount = msg.value * exchangeRatio;
        i_testToken.mint(msg.sender, exchangeAmount);
    }

    function returnTokens(uint256 amount) external {
        require(
            amount > minReturnAmount,
            "Amount must be greater than minReturnAmount"
        );
        uint256 penaltyAmount = (amount * returnPenalty) / 100;
        uint256 returnAmount = (amount - penaltyAmount) / exchangeRatio;
        i_testToken.burnFrom(msg.sender, amount);
        payable(msg.sender).transfer(returnAmount);
    }

    function updateExchangeRatio(uint256 _exchangeRatio) external onlyOwner {
        exchangeRatio = _exchangeRatio;
    }

    function updateReturnPenalty(uint256 _returnPenalty) external onlyOwner {
        returnPenalty = _returnPenalty;
    }

    function updateMinReturnAmount(
        uint256 _minReturnAmount
    ) external onlyOwner {
        minReturnAmount = _minReturnAmount;
    }

    function updateFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }
}
