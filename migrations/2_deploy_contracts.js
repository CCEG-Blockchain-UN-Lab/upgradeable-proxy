var CheckContract = artifacts.require("CheckContract");
var Proxy = artifacts.require("Proxy");
const assert = require('assert');

/**
 * Follow this pattern to workaround the following problem:
 * https://github.com/trufflesuite/truffle/issues/501
 */

module.exports = (deployer) => {
  // Alternatively, just start a chain without a deployment
  deployer.then(async () => {
    let checkContractInstance = await deployer.deploy(CheckContract);
    let proxyInstance = await deployer.deploy(Proxy, checkContractInstance.address);
    let checkContractInstanceByProxy = CheckContract.at(proxyInstance.address);
    await checkContractInstanceByProxy.initialize();
    let testOne = await checkContractInstanceByProxy.isContract.call(checkContractInstanceByProxy.address);
    assert.equal(testOne, true);
    let testTwo = await checkContractInstanceByProxy.isContract.call('0x627306090abab3a6e1400e9345bc60c78a8bef57');
    assert.equal(testTwo, false);
  });
};
