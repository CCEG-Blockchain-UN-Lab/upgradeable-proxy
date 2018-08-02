
import "../../../contracts/Upgradeable.sol";
import "./UintInheritedV1.sol";

contract UintInheritedV2 is UintInheritedV1 {
    function setValue(uint _value) public {
        value = 2*_value;
    }
}
