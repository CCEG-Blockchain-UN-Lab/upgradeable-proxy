pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract StringSimpleV2 is Upgradeable {
    string value;

    function getValue() view public returns (string) {
        return value;
    }

    function setValue(string _value) public {
        value = "I am a really really really happy string";
    }
}
