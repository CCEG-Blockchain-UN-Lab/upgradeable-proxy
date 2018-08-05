pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UintAdvancedV2h_OverrideFunctionSetterSafe is SafeUpgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value+2;
    }
}
