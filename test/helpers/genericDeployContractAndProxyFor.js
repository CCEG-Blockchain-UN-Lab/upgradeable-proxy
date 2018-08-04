const genericDeployOnlyProxyFor = require("./genericDeployOnlyProxyFor");

module.exports = async (proxyName, contract, args) => {
  let contractInstance = await contract.new(
    args === undefined ? {} : { ...args }
  );
  let pi = await genericDeployOnlyProxyFor(proxyName, contractInstance);
  pi.contract = contractInstance;
  return pi;
};
