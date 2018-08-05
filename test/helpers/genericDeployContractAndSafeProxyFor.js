const genericDeployOnlySafeProxyFor = require("./genericDeployOnlySafeProxyFor");

module.exports = async (
  proxyName,
  checkContractInstanceByProxyAddress,
  contract,
  args
) => {
  let contractInstance = await contract.new(
    args === undefined ? {} : { ...args }
  );
  let pi = await genericDeployOnlySafeProxyFor(
    proxyName,
    checkContractInstanceByProxyAddress,
    contractInstance
  );
  pi.contract = contractInstance;
  return pi;
};
