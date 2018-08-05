const deployOnlyProxyFor = require("./helpers/deployOnlyProxyFor");
const deployContractAndProxyFor = require("./helpers/deployContractAndProxyFor");
const UintEther_Normal = artifacts.require("UintEther_Normal");
const UintEther_Payable = artifacts.require("UintEther_Payable");
const UintEther_NotPayable = artifacts.require("UintEther_NotPayable");

contract("UintEther", function(accounts) {
  let proxy, uintEther_Payable, uintEther_NotPayable, uintEtherbyProxy;

  beforeEach(async function() {
    let result = await Promise.all([
      UintEther_Payable.new(),
      UintEther_NotPayable.new(),
      deployContractAndProxyFor(UintEther_Normal).then(async cnp => {
        proxy = cnp.proxy;
        uintEtherbyProxy = UintEther_Payable.at(proxy.address);
        await uintEtherbyProxy.initialize();
      })
    ]);
    uintEther_Payable = result[0];
    uintEther_NotPayable = result[1];
  });

  it("should be able to send Ether to payable function in upgradeable contract", async function() {
    await uintEtherbyProxy.setValue({ value: 300 });
    let value = await uintEtherbyProxy.getValue.call();
    assert.equal(
      value.toNumber(),
      10,
      "Not equal to the constant defined in the function"
    );
  });

  it("should be able to send Ether to payable function in upgradeable contract that sets value to be the msg.value", async function() {
    let pi = await deployOnlyProxyFor(uintEther_Payable);
    uintEtherbyProxy = pi.proxied;
    await uintEtherbyProxy.setValue({ value: 300 });
    let value = await uintEtherbyProxy.getValue.call();
    assert.equal(
      value.toNumber(),
      300,
      "Not equal to the amount of Ether sent"
    );
  });

  it("should be able to upgrade to function with payable function in upgradeable contract", async function() {
    await uintEtherbyProxy.upgradeTo(uintEther_Payable.address);
    await uintEtherbyProxy.initialize();

    await uintEtherbyProxy.setValue({ value: 300 });
    let value = await uintEtherbyProxy.getValue.call();
    assert.equal(
      value.toNumber(),
      300,
      "Not equal to the amount of Ether sent"
    );
  });

  it("should not be able to send to non-payable function in upgraded contract", async function() {
    await uintEtherbyProxy.upgradeTo(uintEther_NotPayable.address);
    await uintEtherbyProxy.initialize();

    try {
      await uintEtherbyProxy.setValue({ value: 300 });
      throw new Error("This error should not happen");
    } catch (error) {
      assert.equal(
        error.message,
        "VM Exception while processing transaction: revert",
        "upgradeTo() can only be called by the proxy owner"
      );
    }
  });

  it("should be able to upgrade from non-payable to payble function", async function() {
    let pi = await deployOnlyProxyFor(uintEther_NotPayable);
    proxy = pi.proxy;
    uintEtherbyProxy = UintEther_Payable.at(proxy.address);
    await uintEtherbyProxy.initialize();

    try {
      await uintEtherbyProxy.setValue({ value: 300 });
      throw new Error("This error should not happen");
    } catch (error) {
      assert.equal(
        error.message,
        "VM Exception while processing transaction: revert",
        "upgradeTo() can only be called by the proxy owner"
      );
    }

    await uintEtherbyProxy.upgradeTo(uintEther_Payable.address);

    await uintEtherbyProxy.setValue({ value: 300 });
    let value = await uintEtherbyProxy.getValue.call();
    assert.equal(
      value.toNumber(),
      300,
      "Not equal to the amount of Ether sent"
    );
  });
});
