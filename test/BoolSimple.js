const deployContractAndProxyFor = require("./helpers/deployContractAndProxyFor");
const BoolSimpleV1 = artifacts.require("BoolSimpleV1");
const BoolSimpleV2 = artifacts.require("BoolSimpleV2");

contract("BoolSimple", function(accounts) {
  let boolSimpleV2, boolSimpleV1byProxy;

  beforeEach(async function() {
    let result = await Promise.all([
      BoolSimpleV2.new(),
      deployContractAndProxyFor(BoolSimpleV1).then(async cnp => {
        boolSimpleV1byProxy = cnp.proxied;
        await boolSimpleV1byProxy.initialize();
      })
    ]);
    boolSimpleV2 = result[0];
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
