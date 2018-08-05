pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract AddressSimpleV1Safe is SafeUpgradeable {
    address value;

    function getValue() view public returns (address) {
        return value;
    }

    function setValue(address _value) public {
        value = _value;
    }
}
