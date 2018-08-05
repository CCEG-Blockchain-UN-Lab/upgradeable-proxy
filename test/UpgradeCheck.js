const deployContractAndSafeProxyFor = require("./helpers/deployContractAndSafeProxyFor");
const deployOnlyProxyFor = require("./helpers/deployOnlyProxyFor");
const deployOnlySafeProxyFor = require("./helpers/deployOnlySafeProxyFor");
const CheckContract = artifacts.require("CheckContract");
const UpgradeCheck_CanUpgrade = artifacts.require("UpgradeCheck_CanUpgrade");
const UpgradeCheck_CannotUpgrade = artifacts.require(
  "UpgradeCheck_CannotUpgrade"
);
const UpgradeCheckV2_CanUpgrade = artifacts.require(
  "UpgradeCheckV2_CanUpgrade"
);
const UpgradeCheckV2b_CannotUpgrade = artifacts.require(
  "UpgradeCheckV2b_CannotUpgrade"
);
const UpgradeCheckV3_CanUpgrade = artifacts.require(
  "UpgradeCheckV3_CanUpgrade"
);

contract("UpgradeCheck", function(accounts) {
  let safeProxy,
    upgradeCheck_CanUpgrade,
    upgradeCheck_CannotUpgrade,
    upgradeCheckV2_CanUpgrade,
    upgradeCheckV2b_CannotUpgrade,
    upgradeCheckV3_CanUpgrade,
    checkContractInstanceByProxyAddress;

  beforeEach(async function() {
    let result = await Promise.all([
      UpgradeCheck_CannotUpgrade.new(),
      UpgradeCheckV2_CanUpgrade.new(),
      UpgradeCheckV2b_CannotUpgrade.new(),
      UpgradeCheckV3_CanUpgrade.new(),
      deployOnlyProxyFor(await CheckContract.deployed()).then(async ci => {
        checkContractInstanceByProxyAddress = ci.proxied.address;
        await deployContractAndSafeProxyFor(
          checkContractInstanceByProxyAddress,
          UpgradeCheck_CanUpgrade
        ).then(async cnp => {
          safeProxy = cnp.proxy;
          upgradeCheck_CanUpgrade = cnp.contract;
          await cnp.proxied.initialize();
        });
      })
    ]);
    upgradeCheck_CannotUpgrade = result[0];
    upgradeCheckV2_CanUpgrade = result[1];
    upgradeCheckV2b_CannotUpgrade = result[2];
    upgradeCheckV3_CanUpgrade = result[3];
  });

  it("should be able to deploy SafeProxy with upgradeable contract target", async function() {
    await deployOnlySafeProxyFor(
      checkContractInstanceByProxyAddress,
      upgradeCheck_CanUpgrade
    );
  });

  it("should upgrade to an upgradeable contract", async function() {
    await safeProxy.upgradeTo(upgradeCheckV2_CanUpgrade.address);
  });

  it("should not be able to upgrade to itself", async function() {
    try {
      await safeProxy.upgradeTo(upgradeCheck_CanUpgrade.address);
      throw new Error("This error should not happen");
    } catch (error) {
      assert.equal(
        error.message,
        "VM Exception while processing transaction: invalid opcode",
        "Cannot upgrade to self"
      );
    }
  });

  it("should not be able to deploy SafeProxy with non-upgradeable contract", async function() {
    try {
      await deployOnlySafeProxyFor(
        checkContractInstanceByProxyAddress,
        upgradeCheck_CannotUpgrade
      );
      throw new Error("This error should not happen");
    } catch (error) {
      assert.equal(
        error.message,
        "VM Exception while processing transaction: invalid opcode",
        "Cannot deploy SafeProxy to a non-upgradeable contract"
      );
    }
  });

  it("should not be able to upgrade to a non-upgradeable contract", async function() {
    try {
      await safeProxy.upgradeTo(upgradeCheck_CannotUpgrade.address);
      throw new Error("This error should not happen");
    } catch (error) {
      assert.equal(
        error.message,
        "VM Exception while processing transaction: invalid opcode",
        "Cannot upgrade to a non-upgradeable contract"
      );
    }
  });

  it("should not be able to upgrade to a non-contract", async function() {
    try {
      await deployOnlySafeProxyFor(
        checkContractInstanceByProxyAddress,
        accounts[1]
      );
      throw new Error("This error should not happen");
    } catch (error) {
      assert.equal(
        error.message,
        "VM Exception while processing transaction: invalid opcode",
        "Cannot upgrade to a non-contract"
      );
    }
  });

  it("should only upgrade if upgradeTo(address) functions exist", async function() {
    try {
      await safeProxy.upgradeTo(upgradeCheckV2b_CannotUpgrade.address);
      throw new Error("This error should not happen");
    } catch (error) {
      assert.equal(
        error.message,
        "VM Exception while processing transaction: invalid opcode",
        "Cannot upgrade to a non-contract"
      );
    }

    await safeProxy.upgradeTo(upgradeCheckV3_CanUpgrade.address);
  });
});
