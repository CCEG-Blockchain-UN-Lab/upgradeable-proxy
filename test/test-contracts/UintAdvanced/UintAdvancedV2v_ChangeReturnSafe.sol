pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UintAdvancedV2v_ChangeReturnSafe is SafeUpgradeable {
    uint value;

    function getValue() view public returns (uint[2]) {
        uint[2] memory x;
        x[0] = value;
        x[1] = 2*value;
        return x;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}
