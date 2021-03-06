pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintEther_Normal is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue() payable public {
        value = 10;
    }
}
