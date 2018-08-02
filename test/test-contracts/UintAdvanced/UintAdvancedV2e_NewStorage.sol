pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintAdvancedV2e_NewStorage is Upgradeable {
    uint value;
    uint value2;

    function getValue() view public returns (uint) {
        return value + value2;
    }

    function setValue(uint _value) public {
        value = _value;
    }

    function initialize() initializeOnceOnly public {
        value2 = 100;
    }
}
