pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract MapSimpleV2b is Upgradeable {
    mapping (address => bool) values;

    function getValue(address _index) view public returns (bool) {
        return values[_index];
    }

    function setValue(address _index, bool _value) public {
        values[_index] = _value;
    }
}
