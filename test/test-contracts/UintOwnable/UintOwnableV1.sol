pragma solidity ^0.4.18;

import "../../../contracts/ownable/OwnableUpgradeable.sol";

contract UintOwnableV1 is OwnableUpgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}
