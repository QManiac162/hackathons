// static/js/insurance.js
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
let account;

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contractABI = [ /* Contract ABI */ ];
const contract = new web3.eth.Contract(contractABI, contractAddress);

document.getElementById("connectButton").onclick = async () => {
    account = (await ethereum.request({ method: 'eth_requestAccounts' }))[0];
    document.getElementById("status").innerText = `Connected: ${account}`;
};

document.getElementById("issuePolicyButton").onclick = async () => {
    await contract.methods.issuePolicy(account, web3.utils.toWei('1', 'ether'))
        .send({ from: account });
    document.getElementById("status").innerText = "Policy Issued";
};

document.getElementById("submitClaimButton").onclick = async () => {
    await contract.methods.submitClaim(account, web3.utils.toWei('1', 'ether'))
        .send({ from: account });
    document.getElementById("status").innerText = "Claim Submitted";
};
