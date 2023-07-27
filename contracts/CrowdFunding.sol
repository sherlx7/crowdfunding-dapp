//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign{
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
    }

    //assign unique id to every Campaign. the mapping is called campaigns
    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns=0;

    //function create a campaign and returns the total number of campaigns
    function createCampaign(address _owner,string memory _title,string memory _description,
    uint256 _target,uint256 _deadline) public returns (uint256) {

    //storing data in storage allows for data to persist between different function calls 
    //storage variables are references to the actual storage location
    //and allows direct modification of the campaign details stored in the mapping
        Campaign storage campaign=campaigns[numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        campaign.owner=_owner;
        campaign.title=_title;
        campaign.description=_description;
        campaign.target=_target;
        campaign.deadline=_deadline;
        campaign.amountCollected=0;

        numberOfCampaigns++;

        return numberOfCampaigns-1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value:amount}("");

        if (sent){
            campaign.amountCollected=campaign.amountCollected + amount;
        }
    }


//NOTE: when returning dynamic arrays from functions, need to specify the storage location explicitly.

    function getDonators(uint256 _id) view public returns (address[] memory,uint256[] memory){
        return (campaigns[_id].donators, campaigns[_id].donations);
        //returns a tuple, first element is an array of donors, second element is array of donations
    }

    function getCampaigns() public view returns (Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint i=0; i<numberOfCampaigns; i++) {
            Campaign memory item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }

}