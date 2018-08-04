const genericDeployContractAndProxyFor = require("./genericDeployContractAndProxyFor");

module.exports = async (contract, args) => {
  return genericDeployContractAndProxyFor("Proxy", contract, args);
};
