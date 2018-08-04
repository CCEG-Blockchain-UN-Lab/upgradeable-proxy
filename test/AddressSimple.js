const deployContractAndProxyFor = require("./helpers/deployContractAndProxyFor");
const AddressSimpleV1 = artifacts.require("AddressSimpleV1");
const AddressSimpleV2 = artifacts.require("AddressSimpleV2");

contract("AddressSimple", function(accounts) {
  let proxy, addressSimpleV2, addressSimpleV1byProxy;

  const inputValue = "0xa4532e9f6f9c4e4abb89bdbb73d3003210ede61c",
    inputValue2 = "0x5c28D962c93282C6Fbe820f9AB33844D96b4853e";

  beforeEach(async function() {
    addressSimpleV2 = await AddressSimpleV2.new();
    let cnp = await deployContractAndProxyFor(AddressSimpleV1);
    proxy = cnp.proxy;
    addressSimpleV1byProxy = cnp.proxied;

    await addressSimpleV1byProxy.initialize();
    target = await addressSimpleV1byProxy.target();
  });

  it("should be able to upgrade to new address function", async function() {
    await addressSimpleV1byProxy.setValue(inputValue);
    let value = await addressSimpleV1byProxy.getValue.call();
    assert.equal(value, inputValue, "Not equal to inputValue");

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
});
