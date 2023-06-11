// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract SharedStruct {
    struct PropertyAddress {
        string unitNumber;
        string street;
        string city;
        string state;
        string zip;
        string country;
    }
    struct PropertyData {
        string name;
        string description;
        string propertyStatus;
        string propertyType;
        uint256 landSize;
        uint256 pricePerSqft;
        uint256 bedrooms;
        uint256 bathrooms;
        uint256 yearBuilt;
        uint256 lastSoldPrice;
        uint256 lastSoldDate;
    }
    struct PropertyOwnerContact {
        string name;
        string email;
        string phone;
    }
}
