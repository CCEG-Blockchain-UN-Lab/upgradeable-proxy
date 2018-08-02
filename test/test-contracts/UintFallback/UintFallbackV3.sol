pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintFallbackV3 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function () public {
        revert();
    }
}
