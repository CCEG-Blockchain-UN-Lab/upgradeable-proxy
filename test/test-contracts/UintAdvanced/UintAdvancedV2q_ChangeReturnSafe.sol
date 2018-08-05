pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

import "../../../contracts/safe/SafeUpgradeable.sol";

contract UintAdvancedV2q_ChangeReturnSafe is SafeUpgradeable {
    uint value;

    function getValue() view public returns (bytes32) {
        return 0x30ed9383ab64b27cb4b70035e743294fe1a1c83eaf57eca05033b523d1fa4261;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}
