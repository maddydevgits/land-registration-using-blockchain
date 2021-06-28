var propertyRegistration = artifacts.require("./PropertyRegistration.sol");

module.exports = function(deployer) {
  deployer.deploy(propertyRegistration);
};
