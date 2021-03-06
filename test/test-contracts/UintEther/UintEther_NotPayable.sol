pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract UintEther_NotPayable is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue() public {
        value = msg.value;
    }
}
