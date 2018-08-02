pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintInitializeV1a_NotInitialized is Upgradeable {
    uint value = 111;

    function getValue() view public returns (uint) {
        return value;
    }
}
