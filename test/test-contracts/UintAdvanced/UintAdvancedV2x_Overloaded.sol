pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintAdvancedV2x_Overloaded is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function getValue(uint _value2) view public returns (uint) {
        return value + _value2;
    }

    function setValue(uint _value) public {
        value = _value;
    }

    function setValue(uint _value, uint _value2) public {
        value = _value + _value2;
    }
}
