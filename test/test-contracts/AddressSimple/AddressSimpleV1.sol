pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";

contract AddressSimpleV1 is Upgradeable {
    address value;

    function getValue() view public returns (address) {
        return value;
    }

    function setValue(address _value) public {
        value = _value;
    }
}
