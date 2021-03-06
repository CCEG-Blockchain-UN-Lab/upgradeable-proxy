pragma solidity ^0.4.18;

import "./UintSimpleModularV1_Storage.sol";

contract UintSimpleModularV1_Logic is UintSimpleModularV1_Storage {
  function getValue() view public returns (uint) {
      return value;
  }

  function setValue(uint _value) public {
      value = _value;
  }
}
