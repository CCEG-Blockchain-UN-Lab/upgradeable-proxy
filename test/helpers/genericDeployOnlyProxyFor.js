module.exports = async (proxyName, contratInstanceToProxy) => {
  const Proxy = artifacts.require(proxyName);
  let proxy = await Proxy.new(contratInstanceToProxy.address);
  let proxiedContractInstance = contratInstanceToProxy.constructor.at(
    proxy.address
  );

  return { proxy: proxy, proxied: proxiedContractInstance };
};
