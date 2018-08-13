pragma solidity ^0.4.0;

import "./Upgradeable.sol";

contract CheckContract is Upgradeable{
    /*
     * @notice Checks if if the supplied address points to a contract
     * @param _target - The address to be checked
     * @return true if the target is a contract
     */
    function isContract(address _target) view public returns (bool) {
        uint256 size;
        assembly { size := extcodesize(_target) } // Note: the EXTCODESIZE may not work after Serenity hard fork
        return size > 0;
    }
}
