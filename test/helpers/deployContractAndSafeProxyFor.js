const genericDeployContractAndSafeProxyFor = require("./genericDeployContractAndSafeProxyFor");

module.exports = async (
  checkContractInstanceByProxyAddress,
  contract,
  args
) => {
  return genericDeployContractAndSafeProxyFor(
    "SafeProxy",
    checkContractInstanceByProxyAddress,
    contract,
    args
  );
};
