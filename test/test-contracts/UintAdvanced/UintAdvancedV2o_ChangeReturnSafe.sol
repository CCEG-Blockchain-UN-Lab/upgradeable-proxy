pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UintAdvancedV2o_ChangeReturnSafe is SafeUpgradeable {
    uint value;

    function getValue() view public returns (string) {
        return 'I am a happy string';
    }

    function setValue(uint _value) public {
        value = _value;
    }
}
