pragma solidity ^0.4.18;

import "./UintSimpleModularV1_StorageSafe.sol";

contract UintSimpleModularV2_LogicSafe is UintSimpleModularV1_StorageSafe {
  function getValue() view public returns (uint) {
      return value;
  }

  function setValue(uint _value) public {
      value = 2*_value;
  }
}
