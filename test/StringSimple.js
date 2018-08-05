const deployContractAndProxyFor = require("./helpers/deployContractAndProxyFor");
const StringSimpleV1 = artifacts.require("StringSimpleV1");
const StringSimpleV2 = artifacts.require("StringSimpleV2");

contract("StringSimple", function(accounts) {
  let stringSimpleV2, stringSimpleV1byProxy;

  const inputValue = "I am a new string",
    inputValue2 = "I am a different string";

  beforeEach(async function() {
    let result = await Promise.all([
      StringSimpleV2.new(),
      deployContractAndProxyFor(StringSimpleV1).then(async cnp => {
        stringSimpleV1byProxy = cnp.proxied;
        await stringSimpleV1byProxy.initialize();
      })
    ]);
    stringSimpleV2 = result[0];
  });

  it("should be able to upgrade to new string function", async function() {
    await stringSimpleV1byProxy.setValue(inputValue);
    let value = await stringSimpleV1byProxy.getValue.call();
    assert.equal(value, inputValue, "Not equal to inptValue");

    await stringSimpleV1byProxy.upgradeTo(stringSimpleV2.address);
    await stringSimpleV1byProxy.initialize();

    value = await stringSimpleV1byProxy.getValue.call();
    assert.equal(value, inputValue, "Not equal to inptValue");

    await stringSimpleV1byProxy.setValue(inputValue2);
    value = await stringSimpleV1byProxy.getValue.call();
    assert.equal(
      value,
      "I am a really really really happy string",
      "Not equal to constant defined in function"
    );
  });
});
