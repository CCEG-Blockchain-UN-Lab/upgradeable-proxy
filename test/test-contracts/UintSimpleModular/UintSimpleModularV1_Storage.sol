pragma solidity ^0.4.18;

import "../../../contracts/Upgradeable.sol";
import "./UintSimpleModularV1_Events.sol";

contract UintSimpleModularV1_Storage is Upgradeable, UintSimpleModularV1_Events {
    uint value;
}
