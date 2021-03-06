pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract BoolSimpleV1Safe is SafeUpgradeable {
    bool value;

    function getValue() view public returns (bool) {
        return value;
    }

    function setValue(bool _value) public {
        value = _value;
    }
}
