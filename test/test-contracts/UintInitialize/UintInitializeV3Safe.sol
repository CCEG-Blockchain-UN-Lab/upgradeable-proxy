pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UintInitializeV3Safe is SafeUpgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function initialize() initializeOnceOnly public {
        revert(); // Should overloade this inherited function to prevent accidental execution which would then block initialize(uint) from executing
    }

    function initialize(uint _value) initializeOnceOnly public {
        value = _value;
    }
}
