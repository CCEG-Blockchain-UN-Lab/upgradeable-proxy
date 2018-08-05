pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract ArraySimpleV1bSafe is SafeUpgradeable {
    uint[] values;
    uint anotherValue;

    function getValues() view public returns (uint[]) {
        return values;
    }

    function setValues(uint[] _values) public {
        values = _values;
    }
}
