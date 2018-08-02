pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintAdvancedV2g_OverrideFunctionGetter is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value+2;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}
