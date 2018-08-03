pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintSimpleV1 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}