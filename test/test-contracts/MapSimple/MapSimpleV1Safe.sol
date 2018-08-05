pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract MapSimpleV1Safe is SafeUpgradeable {
    mapping (uint => bool) values;

    function getValue(uint _index) view public returns (bool) {
        return values[_index];
    }

    function setValue(uint _index, bool _value) public {
        values[_index] = _value;
    }
}
