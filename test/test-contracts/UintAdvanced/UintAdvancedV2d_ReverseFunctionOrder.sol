pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintAdvancedV2d_ReverseFunctionOrder is Upgradeable {
    uint value;

    function setValue(uint _value) public {
        value = _value;
    }

    function getValue() view public returns (uint) {
        return value;
    }
}
