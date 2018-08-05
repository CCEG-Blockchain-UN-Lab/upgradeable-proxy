pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";
import "./UintSimpleModularV1_Events.sol";

contract UintSimpleModularV1_StorageSafe is SafeUpgradeable, UintSimpleModularV1_Events {
    uint value;
}
