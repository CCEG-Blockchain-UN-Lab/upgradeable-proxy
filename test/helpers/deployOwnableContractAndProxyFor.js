const genericDeployContractAndProxyFor = require("./genericDeployContractAndProxyFor");

module.exports = async (contract, args) => {
  return genericDeployContractAndProxyFor("OwnableProxy", contract, args);
};
