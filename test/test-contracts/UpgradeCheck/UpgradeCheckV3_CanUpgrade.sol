pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UpgradeCheckV3_CanUpgrade {
    address public target;
    /*mapping (address => bool) public initialized;*/
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = 2*_value;
    }

    function upgradeTo(address) public {}
    function initialize() public {}
}
