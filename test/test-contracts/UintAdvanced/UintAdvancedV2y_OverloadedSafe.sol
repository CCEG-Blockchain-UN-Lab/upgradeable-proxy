pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UintAdvancedV2y_OverloadedSafe is SafeUpgradeable {
    uint value;

    function getValue(uint value2) view public returns (uint) {
        return value + value2;
    }

    function setValue(uint _value, uint _value2) public {
        value = _value + _value2;
    }
}
