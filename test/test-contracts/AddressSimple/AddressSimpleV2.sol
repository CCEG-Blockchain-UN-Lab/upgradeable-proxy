pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract AddressSimpleV2 is Upgradeable {
    address value;

    function getValue() view public returns (address) {
        return value;
    }

    function setValue(address _value) public {
        value = 0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520fBB98;
    }
}
