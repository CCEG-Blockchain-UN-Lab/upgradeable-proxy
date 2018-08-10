const CheckContract = artifacts.require("CheckContract");
const Proxy = artifacts.require("Proxy");
const AddressSimpleV1 = artifacts.require("AddressSimpleV1Safe");
const AddressSimpleV2 = artifacts.require("AddressSimpleV2Safe");
const SafeProxy = artifacts.require("SafeProxy");
const assert = require("assert");

/**
 * Follow this pattern to workaround the following problem:
 * https://github.com/trufflesuite/truffle/issues/501
 */

module.exports = deployer => {
  // Alternatively, just start a chain without a deployment
  deployer.then(async () => {
    /**
     * Deploy Upgradeable CheckContract so that after Serenity hardfork, the method to check if an address is a contract
     * can be upgraded. More information here:
     * https://github.com/CCEG-Blockchain-UN-Lab/upgradeable-proxy/blob/master/contracts/CheckContract.sol#L13
     */
    let checkContractInstance = await deployer.deploy(CheckContract);

    /**
     * Deploy a Proxy for the just deployed CheckContract.
     */
    let proxyInstance = await deployer.deploy(
      Proxy,
      checkContractInstance.address
    );

    /**
     * Get the instance of the CheckContract by proxy, and initialize.
     */
    let checkContractInstanceByProxy = CheckContract.at(proxyInstance.address);
    await checkContractInstanceByProxy.initialize();

    /**
     * (OPTIONAL) Make some tests to make sure the method isContract called by proxy is properly working.
     */
    let testOne = await checkContractInstanceByProxy.isContract.call(
      checkContractInstanceByProxy.address
    );
    assert.equal(testOne, true);
    let testTwo = await checkContractInstanceByProxy.isContract.call(
      "0x627306090abab3a6e1400e9345bc60c78a8bef57"
    );
    assert.equal(testTwo, false);

    /**
     * Deploy the Upgradeable contract
     */
    let addressSimpleV1 = await deployer.deploy(AddressSimpleV1);

    /**
     * Deploy a SafeProxy for the just deployed AddressSimpleV1Safe.
     */
    let proxyPlus = await SafeProxy.new(
      addressSimpleV1.address,
      checkContractInstanceByProxy.address
    );

    /**
     * Get the instance of the AddressSimpleV1Safe by proxy, and initialize.
     */
    let addressSimpleV1byProxy = AddressSimpleV1.at(proxyPlus.address);
    await addressSimpleV1byProxy.initialize();

    /**
     * (OPTIONAL) Make some tests to make sure the Upgradeable contract called by proxy is properly working.
     */
    const inputValue = "0xa4532e9f6f9c4e4abb89bdbb73d3003210ede61c",
      inputValue2 = "0x5c28D962c93282C6Fbe820f9AB33844D96b4853e";
    await addressSimpleV1byProxy.setValue(inputValue);
    let value = await addressSimpleV1byProxy.getValue.call();
    assert.equal(value, inputValue, "Not equal to inputValue");

    let addressSimpleV2 = await deployer.deploy(AddressSimpleV2);
    await addressSimpleV1byProxy.upgradeTo(addressSimpleV2.address);
    await addressSimpleV1byProxy.initialize();
    value = await addressSimpleV1byProxy.getValue.call();
    assert.equal(value, inputValue, "Not equal to inputValue");

    await addressSimpleV1byProxy.setValue(inputValue2);
    value = await addressSimpleV1byProxy.getValue.call();
    assert.equal(
      value,
      "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
      "Not equal to constant defined in function"
    );
  });
};
