pragma solidity ^0.4.18;

import "./UintInheritedV1Safe.sol";

contract UintInheritedV2Safe is UintInheritedV1Safe {
    function setValue(uint _value) public {
        value = 2*_value;
    }
}
