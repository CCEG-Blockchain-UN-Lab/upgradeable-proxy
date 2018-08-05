pragma solidity ^0.4.18;

contract UpgradeCheck_CannotUpgrade {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = 2*_value;
    }
}
