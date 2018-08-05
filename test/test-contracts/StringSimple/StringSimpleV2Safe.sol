pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract StringSimpleV2Safe is SafeUpgradeable {
    string value;

    function getValue() view public returns (string) {
        return value;
    }

    function setValue(string _value) public {
        value = "I am a really really really happy string";
    }
}
