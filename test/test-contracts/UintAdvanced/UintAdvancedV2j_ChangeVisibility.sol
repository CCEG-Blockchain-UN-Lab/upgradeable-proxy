pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintAdvancedV2j_ChangeVisibility is Upgradeable {
    uint value;

    function getValue() view external returns (uint) {
        return value;
    }

    function setValue(uint _value) external {
        value = _value;
    }
}
