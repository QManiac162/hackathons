// contracts/InsurancePolicy.sol
pragma solidity ^0.8.0;

contract InsurancePolicy {
    address public insurer;
    mapping(address => uint) public policies;
    mapping(address => bool) public claims;

    event PolicyIssued(address indexed policyHolder, uint premium);
    event ClaimSubmitted(address indexed policyHolder, uint payout);

    constructor() {
        insurer = msg.sender;
    }

    modifier onlyInsurer() {
        require(msg.sender == insurer, "Only insurer can call this function.");
        _;
    }

    function issuePolicy(address _policyHolder, uint _premium) public onlyInsurer {
        require(policies[_policyHolder] == 0, "Policy already exists.");
        policies[_policyHolder] = _premium;
        emit PolicyIssued(_policyHolder, _premium);
    }

    function submitClaim(address _policyHolder, uint _payout) public onlyInsurer {
        require(policies[_policyHolder] > 0, "Policy does not exist.");
        require(!claims[_policyHolder], "Claim already submitted.");
        claims[_policyHolder] = true;
        (bool sent, ) = _policyHolder.call{value: _payout}("");
        require(sent, "Failed to send payout.");
        emit ClaimSubmitted(_policyHolder, _payout);
    }

    receive() external payable {}
}
