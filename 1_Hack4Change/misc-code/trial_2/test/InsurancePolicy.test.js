// test/InsurancePolicy.test.js
const InsurancePolicy = artifacts.require("InsurancePolicy");

contract("InsurancePolicy", accounts => {
  it("should issue a policy and submit a claim", async () => {
    let instance = await InsurancePolicy.deployed();
    await instance.issuePolicy(accounts[1], web3.utils.toWei('1', 'ether'), { from: accounts[0] });
    await instance.submitClaim(accounts[1], web3.utils.toWei('1', 'ether'), { from: accounts[0] });
    let claimStatus = await instance.claims(accounts[1]);
    assert(claimStatus === true, "Claim should be true");
  });
});
