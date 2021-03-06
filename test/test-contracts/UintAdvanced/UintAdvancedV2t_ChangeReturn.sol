pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintAdvancedV2t_ChangeReturn is Upgradeable {
    uint value;

    function getValue() view public returns (uint , string) {
        return (value, 'I am a happy string');
    }

    function setValue(uint _value) public {
        value = _value;
    }
}
