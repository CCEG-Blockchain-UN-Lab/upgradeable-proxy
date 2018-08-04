const deployOnlyProxyFor = require("./helpers/deployOnlyProxyFor");
const BoolSimpleV1 = artifacts.require("BoolSimpleV1");
const BoolSimpleV2 = artifacts.require("BoolSimpleV2");

contract("BoolSimple", function(accounts) {
  let proxy, boolSimpleV1, boolSimpleV2, boolSimpleV1byProxy;

  beforeEach(async function() {
    boolSimpleV1 = await BoolSimpleV1.new();
    boolSimpleV2 = await BoolSimpleV2.new();
    let pi = await deployOnlyProxyFor(boolSimpleV1);
    proxy = pi.proxy;
    boolSimpleV1byProxy = pi.contract;
    await boolSimpleV1byProxy.initialize();
  });

  it("should be able to upgrade to new bool function", async function() {
    await boolSimpleV1byProxy.setValue(true);
    let value = await boolSimpleV1byProxy.getValue.call();
    assert.equal(value, true, "Not equal to true");

    await boolSimpleV1byProxy.upgradeTo(boolSimpleV2.address);
    await boolSimpleV1byProxy.initialize();

    value = await boolSimpleV1byProxy.getValue.call();
    assert.equal(value, true, "Not equal to true");

    await boolSimpleV1byProxy.setValue(true);
    value = await boolSimpleV1byProxy.getValue.call();
    assert.equal(value, false, "Not equal to false");
  });
});
