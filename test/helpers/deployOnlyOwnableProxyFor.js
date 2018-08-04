const genericDeployOnlyProxyFor = require("./genericDeployOnlyProxyFor");

module.exports = async contratInstanceToProxy => {
  return genericDeployOnlyProxyFor("OwnableProxy", contratInstanceToProxy);
};
