pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintInitializeV1b_Initialized is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function initialize() initializeOnceOnly public {
        value = 111;
    }
}
