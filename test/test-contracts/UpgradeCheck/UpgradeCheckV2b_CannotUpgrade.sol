pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UpgradeCheckV2b_CannotUpgrade {
    address target;
    mapping (address => bool) initialized;
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = 2*_value;
    }

    function upgradeTo() public {}
}
