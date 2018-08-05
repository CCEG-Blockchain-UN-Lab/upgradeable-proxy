pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UintFallbackV4Safe is SafeUpgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function () payable public {
        value = msg.value;
    }
}
