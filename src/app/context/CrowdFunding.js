'use client';

import React, {useState, useEffect} from 'react';
import Web3Modal from "web3modal";
// import { ethers } from "ethers";
import { BrowserProvider, parseUnits } from "ethers";
import { CrowdFundingABI,CrowdFundingAddress } from './contants';

const ethers = require("ethers")

const fetchContract = (signerOrProvider) => {
    return new ethers.Contract(CrowdFundingAddress,CrowdFundingABI,signerOrProvider)
}

export const CrowdFundingContext = React.createContext();

//create crowdfunding context providor
export const CrowdFundingProvider = ({children}) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");

    const createCampaign = async (campaign) => {
        //destructure properties from campaign object
        const {title, description, amount,deadline} = campaign;

        //Web3Modal library is used to establish a connection to the Ethereum wallet
        const web3Modal = new Web3Modal;
        const connection = await web3Modal.connect(); 
        //connection here is a web3modal provider

        //wrap the Web3Modal provider into an ethers provider 
        const provider = await ethers.providers.web3Provier(connection);
        const signer = provider.getSigner();

        //create a contract instance
        const contract = fetchContract(signer);

        console.log(currentAccount);

        //calls createCampaign function on contract instance
        try {
            const transaction = await contract.createCampaign(
                currentAccount, //owner
                title,
                description,
                ethers.utils.parseUnits(amount,18),
                new Date(dateline).getTime() // deadline
            )

            await transaction.wait();
            console.log("contract call success",transaction);

        } catch(error) {
            console.log("contract call error", error);
        }
    }

    const getCampaigns = async() => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const campaigns = await contract.getCampaigns();

        const parsedCampaigns = campaigns.map((campaign,i) => ({
            owner:campaign.owner,
            title:campaign.title,
            description:campaign.description,
            target:ethers.utils.formatEther(campaign.target.toString()),
            deadline:campaign.deadline.toNumber(),
            amountCollected:ethers.utilsformatEther(campaign.amountCollected.toString()),
            pId:i
        }))

        return parsedCampaigns;
    }

    const getUserCampaigns = async() => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const allCampaigns = await contract.getCampaigns();

        const account = await window.ethereum.request({
            method:"eth_accounts",
        });

        const currentUser = account[0];
        const filterCampaigns = allCampaigns.filter((campaign)=>{
            campaign.owner="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        })

        const userData = filterCampaigns.map((campaign,i)=>({
            owner:campaign.owner,
            title:campaign.title,
            description:campaign.description,
            target:ethers.utils.formatEther(campaign.target.toString()),
            deadline:campaign.deadline.toNumber(),
            amountCollected:ethers.utils.formatEther(campaign.amountCollected.toString()),
            pId:i,
        }));

        return userData;
    }

    const donate = async (pId,amount) => {
        const web3Modal = new Web3Modal;
        const connection = await web3Modal.connect();  
        const provider = await ethers.providers.web3Provier(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pId,{
            value: ethers.parseEther(amount),
        });

        await campaignData.wait();
        location.reload();

        return campaignData;
    }

    const getDonations = async (pId) => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i=0; i<numberOfDonations;i++) {
            parsedDonations.push({
                donator:donations[0][i],
                donation:ethers.utils.formatEther(donations[1][i].toString())
            });
        }

        return parsedDonations;
    }

    //CHECK IF WALLET iS CONNECTED
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum){
                return setOpenError(true),setError("Install metamask")
            }

            const accounts = await window.ethereum.request({
                methods:"eth_accounts",
            });

            if (accounts.length){
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account found");
            }
        } catch (error) {
            console.log("Something went wrong when connecting to the wallet")
        }
    };

    useEffect(()=>{
        checkIfWalletConnected();
    },[])

    const connectWallet = async() => {
        try {
            if (!window.ethereum){
                return setOpenError(true),setError("Install metamask")
            }

            const accounts = await window.ethereum.request({
                methods:"eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log("Error while connecting to wallet")
        }
    };


    //in provider,set it to the value prop to wtv you want to 
    //pass down the entire component tree
    return(
        <CrowdFundingContext.Provider
        value={{
            titleData,currentAccount,
            createCampaign,getCampaigns,
            getUserCampaigns,donate,
            getDonations,connectWallet
        }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};

