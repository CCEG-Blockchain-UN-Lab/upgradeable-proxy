pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract ArraySimpleV2b is Upgradeable {
    uint[] values;
    uint anotherValue;

    function getValues() view public returns (uint[]) {
        return values;
    }

    function setValues(uint[] _values) public {
        values = [1, 2, 3];
    }
}
