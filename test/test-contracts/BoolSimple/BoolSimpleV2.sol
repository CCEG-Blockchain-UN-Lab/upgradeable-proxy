pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract BoolSimpleV2 is Upgradeable {
    bool value;

    function getValue() view public returns (bool) {
        return value;
    }

    function setValue(bool _value) public {
        value = false;
    }
}
