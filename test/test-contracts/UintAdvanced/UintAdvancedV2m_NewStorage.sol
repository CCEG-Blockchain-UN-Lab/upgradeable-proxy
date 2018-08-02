pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintAdvancedV2m_NewStorage is Upgradeable {
    uint value;
    uint value2;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }

    function initialize() initializeOnceOnly public {
        value2 = 100;
    }

    function getValue2() public returns (uint) {
        return value2;
    }

    function setValue2(uint _value2) public {
        value2 = _value2;
    }
}
