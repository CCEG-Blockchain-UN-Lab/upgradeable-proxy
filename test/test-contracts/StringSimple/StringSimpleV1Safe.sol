pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract StringSimpleV1Safe is SafeUpgradeable {
    string value;

    function getValue() view public returns (string) {
        return value;
    }

    function setValue(string _value) public {
        value = _value;
    }
}
