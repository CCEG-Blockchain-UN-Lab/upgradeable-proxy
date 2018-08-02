pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintFallbackV4 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function () payable public {
        value = msg.value;
    }
}
