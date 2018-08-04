const SafeProxy = artifacts.require("SafeProxy");

module.exports = async (
  checkContractInstanceByProxyAddress,
  contratInstanceToProxy
) => {
  let safeProxy = await SafeProxy.new(
    contratInstanceToProxy.address,
    checkContractInstanceByProxyAddress
  );
  let proxiedContractInstance = contratInstanceToProxy.constructor.at(
    safeProxy.address
  );

  return { proxy: safeProxy, contract: proxiedContractInstance };
};
