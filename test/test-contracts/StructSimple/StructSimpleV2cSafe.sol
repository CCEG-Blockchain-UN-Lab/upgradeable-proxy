pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract StructSimpleV2cSafe is SafeUpgradeable {
    struct MyStruct {
        bool sBool;
        uint sUint;
    }
    MyStruct structValue1;
    MyStruct structValue2;

    function getValue() view public returns (uint returnUint, bool returnBool) {
        returnUint = structValue1.sUint;
        returnBool = structValue1.sBool;
    }

    function setValue(uint _sUint, bool _sBool) public {
        structValue1.sUint = 1;
        structValue1.sBool = false;
    }
}
