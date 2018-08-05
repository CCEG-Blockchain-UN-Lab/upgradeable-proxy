pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UintAdvancedV2k_ChangeVisibilitySafe is SafeUpgradeable {
    uint value;

    function getValue() view internal returns (uint) {
        return value;
    }

    function setValue(uint _value) internal {
        value = _value;
    }
}
