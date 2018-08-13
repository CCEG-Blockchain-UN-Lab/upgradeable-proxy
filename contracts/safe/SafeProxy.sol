pragma solidity ^0.4.0;

import './SafeProxied.sol';
import './SafeUpgradeable.sol';
import '../CheckContract.sol';

contract SafeProxy is SafeProxied {

    constructor(address _target, address _checkContractProxy) public {
        checkContract = CheckContract(_checkContractProxy);
        upgradeTo(_target);
    }

    function upgradeTo(address _target) public {
        assert(target != _target);
        assert(isContract(_target));
        assert(isUpgradeable(_target));

        address oldTarget = target;
        target = _target;

        emit EventUpgrade(_target, oldTarget, msg.sender);
    }

    function upgradeTo(address _target, bytes _data) public {
        upgradeTo(_target);
        assert(target.delegatecall(_data));
    }

    function () payable public {
        bytes memory data = msg.data;
        address impl = target;

        assembly {
            let result := delegatecall(gas, impl, add(data, 0x20), mload(data), 0, 0)
            let size := returndatasize

            let ptr := mload(0x40)
            returndatacopy(ptr, 0, size)

            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }

    /*
     * @notice Checks if if the supplied address points to a contract
     * @param _target - The address to be checked
     * @return true if the target is a contract
     */
    function isContract(address _target) internal view returns (bool) {
        return address(CheckContract(checkContract)).call(bytes4(keccak256("isContract(address)")), _target);
    }

    /*
     * @notice Checks if the supplied address is a contract that probably inherits from Upgradeable
     * @param _target - The address to be checked
     * @returns true if the target address implements the upgradeTo() function
     */
    function isUpgradeable(address _target) internal view returns (bool) {
        return address(SafeUpgradeable(_target)).call(bytes4(keccak256("upgradeTo(address)")), address(this));
    }

}
