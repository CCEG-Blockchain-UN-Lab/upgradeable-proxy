const deployOnlyProxyFor = require("./helpers/deployOnlyProxyFor");
const deployContractAndProxyFor = require("./helpers/deployContractAndProxyFor");
const UintFallbackV1 = artifacts.require("UintFallbackV1");
const UintFallbackV2 = artifacts.require("UintFallbackV2");
const UintFallbackV3 = artifacts.require("UintFallbackV3");
const UintFallbackV4 = artifacts.require("UintFallbackV4");

contract("UintFallback", function(accounts) {
  let proxy,
    uintFallbackV1,
    uintFallbackV2,
    uintFallbackV3,
    uintFallbackV4,
    uintFallbackbyProxy;

  beforeEach(async function() {
    uintFallbackV2 = await UintFallbackV2.new();
    uintFallbackV3 = await UintFallbackV3.new();
    uintFallbackV4 = await UintFallbackV4.new();
    let cnp = await deployContractAndProxyFor(UintFallbackV1);
    proxy = cnp.proxy;
    uintFallbackbyProxy = cnp.proxied;
    uintFallbackV1 = cnp.contract;
    await uintFallbackbyProxy.initialize();
  });

  it("should be able to send upgrade the contract's fallback function to set new value", async function() {
    await web3.eth.sendTransaction({
      to: uintFallbackbyProxy.address,
      from: accounts[0],
      value: 0
    });
    let value = await uintFallbackbyProxy.getValue.call();
    assert.equal(value.toNumber(), 10, "The value should be 10");

    await uintFallbackbyProxy.upgradeTo(uintFallbackV2.address);
    await uintFallbackbyProxy.initialize();

    value = await uintFallbackbyProxy.getValue.call();
    assert.equal(value.toNumber(), 10, "The value should be 10");

    await web3.eth.sendTransaction({
      to: uintFallbackbyProxy.address,
      from: accounts[0],
      value: 0
    });
    value = await uintFallbackbyProxy.getValue.call();
    assert.equal(value.toNumber(), 20, "The value should be 20");
  });

  it("should be able to send upgrade the contract's fallback function to revert", async function() {
    await web3.eth.sendTransaction({
      to: uintFallbackbyProxy.address,
      from: accounts[0],
      value: 0
    });
    let value = await uintFallbackbyProxy.getValue.call();
    assert.equal(value.toNumber(), 10, "The value should be 10");

    await uintFallbackbyProxy.upgradeTo(uintFallbackV3.address);
    await uintFallbackbyProxy.initialize();

    value = await uintFallbackbyProxy.getValue.call();
    assert.equal(value.toNumber(), 10, "The value should be 10");

    try {
      await web3.eth.sendTransaction({
        to: uintFallbackbyProxy.address,
        from: accounts[0],
        value: 0
      });
      throw new Error("This error should not happen");
    } catch (error) {
      assert.equal(
        error.message,
        "VM Exception while processing transaction: revert",
        "() should revert"
      );
    }
  });

  it("should not be able to pay a non-payable upgradeable contract's fallback function", async function() {
    try {
      await web3.eth.sendTransaction({
        to: uintFallbackbyProxy.address,
        from: accounts[0],
        value: 10
      });
      throw new Error("This error should not happen");
    } catch (error) {
      assert.equal(
        error.message,
        "VM Exception while processing transaction: revert",
        "() should revert"
      );
    }
  });

  it("should be able to pay a payable upgradeable contract's fallback function", async function() {
    let pi = await deployOnlyProxyFor(uintFallbackV4);
    proxy = pi.proxy;
    uintFallbackbyProxy = UintFallbackV1.at(proxy.address);
    await uintFallbackbyProxy.initialize();

    await web3.eth.sendTransaction({
      to: uintFallbackbyProxy.address,
      from: accounts[0],
      value: 32
    });
    let value = await uintFallbackbyProxy.getValue.call();
    assert.equal(value.toNumber(), 32, "The value should be msg.value");
  });

  it("should not be able to pay a non-payable upgradeable contract's fallback function after upgraded from a payable one", async function() {
    let pi = await deployOnlyProxyFor(uintFallbackV4);
    proxy = pi.proxy;
    uintFallbackbyProxy = UintFallbackV1.at(proxy.address);
    await uintFallbackbyProxy.initialize();

    await uintFallbackbyProxy.upgradeTo(uintFallbackV1.address);

    try {
      await web3.eth.sendTransaction({
        to: uintFallbackbyProxy.address,
        from: accounts[0],
        value: 10
      });
      throw new Error("This error should not happen");
    } catch (error) {
      assert.equal(
        error.message,
        "VM Exception while processing transaction: revert",
        "() should revert"
      );
    }
  });

  it("should be able to pay a payable upgradeable contract's fallback function after upgraded from a non-payable one", async function() {
    await uintFallbackbyProxy.upgradeTo(uintFallbackV4.address);
    await uintFallbackbyProxy.initialize();

    await web3.eth.sendTransaction({
      to: uintFallbackbyProxy.address,
      from: accounts[0],
      value: 32
    });
    let value = await uintFallbackbyProxy.getValue.call();
    assert.equal(value.toNumber(), 32, "The value should be msg.value");
  });
});
