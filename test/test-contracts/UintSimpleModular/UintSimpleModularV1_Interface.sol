pragma solidity ^0.4.18;

import "./UintSimpleModularV1_Events.sol";

contract UintSimpleModularV1_Interface is UintSimpleModularV1_Events {
    function getValue() view public returns (uint);
    function setValue(uint _value) public;
}
