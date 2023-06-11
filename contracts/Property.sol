// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "./SharedStruct.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Property is SharedStruct, Ownable {
    PropertyAddress public propertyAddress;
    PropertyData public propertyData;
    PropertyOwnerContact public propertyOwnerContact;

    constructor(
        PropertyAddress memory _propertyAddress,
        PropertyData memory _propertyData,
        PropertyOwnerContact memory _propertyOwnerContact
    ) {
        propertyAddress = _propertyAddress;
        propertyData = _propertyData;
        propertyOwnerContact = _propertyOwnerContact;
    }

    function updatePropertyAddress(
        PropertyAddress memory _propertyAddress
    ) external onlyOwner {
        propertyAddress = _propertyAddress;
    }

    function updatePropertyData(
        PropertyData memory _propertyData
    ) external onlyOwner {
        propertyData = _propertyData;
    }

    function updatePropertyOwnerContact(
        PropertyOwnerContact memory _propertyOwnerContact
    ) external onlyOwner {
        propertyOwnerContact = _propertyOwnerContact;
    }
}

