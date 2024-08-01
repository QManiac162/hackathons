// migrations/2_deploy_contracts.js
const InsurancePolicy = artifacts.require("InsurancePolicy");

module.exports = function(deployer) {
  deployer.deploy(InsurancePolicy);
};
