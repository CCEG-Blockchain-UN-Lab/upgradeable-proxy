pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract DoubleUintV2a_NewStorageSafe is SafeUpgradeable {
    uint value2;
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }

    function getValue2() view public returns (uint) {
        return value2;
    }

    function setValue2(uint _value2) public {
        value2 = _value2;
    }
}
