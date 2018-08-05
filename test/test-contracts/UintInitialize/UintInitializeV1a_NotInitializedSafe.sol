pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UintInitializeV1a_NotInitializedSafe is SafeUpgradeable {
    uint value = 111;

    function getValue() view public returns (uint) {
        return value;
    }

}
