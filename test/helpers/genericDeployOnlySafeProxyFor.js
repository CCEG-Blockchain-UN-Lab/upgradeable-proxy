module.exports = async (
  proxyName,
  checkContractInstanceByProxyAddress,
  contractInstanceToProxy
) => {
  const Proxy = artifacts.require(proxyName);
  let proxy = await Proxy.new(
    contractInstanceToProxy.address,
    checkContractInstanceByProxyAddress
  );
  let proxiedContractInstance = contractInstanceToProxy.constructor.at(
    proxy.address
  );

  return { proxy: proxy, proxied: proxiedContractInstance };
};
