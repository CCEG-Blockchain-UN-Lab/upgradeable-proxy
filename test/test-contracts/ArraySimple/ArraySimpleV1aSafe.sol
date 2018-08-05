pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract ArraySimpleV1aSafe is SafeUpgradeable {
    uint[3] values;
    uint anotherValue;

    function getValues() view public returns (uint[3]) {
        return values;
    }

    function setValues(uint[3] _values) public {
        values = _values;
    }
}
