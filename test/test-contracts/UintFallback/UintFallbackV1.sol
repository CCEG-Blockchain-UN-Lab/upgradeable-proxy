pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintFallbackV1 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function () public {
        value = 10;
    }
}
