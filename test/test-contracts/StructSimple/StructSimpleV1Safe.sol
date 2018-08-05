pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract StructSimpleV1Safe is SafeUpgradeable {
    struct MyStruct {
        uint sUint;
        bool sBool;
    }
    MyStruct structValue1;
    MyStruct structValue2;

    function getValue() view public returns (uint returnUint, bool returnBool) {
        returnUint = structValue1.sUint;
        returnBool = structValue1.sBool;
    }

    function setValue(uint _sUint, bool _sBool) public {
        structValue1.sUint = _sUint;
        structValue1.sBool = _sBool;
    }
}
