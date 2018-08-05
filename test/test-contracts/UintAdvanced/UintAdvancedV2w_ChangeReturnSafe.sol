pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UintAdvancedV2w_ChangeReturnSafe is SafeUpgradeable {
    uint value;

    struct MyStruct {
        uint uintValue;
        string stringValue;
    }

    function getValue() view public returns (MyStruct) {
        MyStruct memory myStruct;
        myStruct.uintValue = value;
        myStruct.stringValue = 'I am a happy string';
        return myStruct;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}
