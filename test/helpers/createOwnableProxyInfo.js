const Proxy = artifacts.require("OwnableProxy");

module.exports = async contratInstanceToProxy => {
  let proxy = await Proxy.new(contratInstanceToProxy.address);
  let proxiedContractInstance = contratInstanceToProxy.constructor.at(
    proxy.address
  );

  return { proxy: proxy, contract: proxiedContractInstance };
};
