pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UintAdvancedV2l_ChangeKeywordSafe is SafeUpgradeable {
    uint value;

    function getValue() pure public returns (uint) {
        return 666;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}
