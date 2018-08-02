pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintInitializeV2 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function initialize() initializeOnceOnly public {
        value = 222;
    }
}
