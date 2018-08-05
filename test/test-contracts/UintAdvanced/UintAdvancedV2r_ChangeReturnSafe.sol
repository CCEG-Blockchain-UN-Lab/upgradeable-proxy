pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UintAdvancedV2r_ChangeReturnSafe is SafeUpgradeable {
    uint value;

    function getValue() view public returns (int) {
        return -3;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}
