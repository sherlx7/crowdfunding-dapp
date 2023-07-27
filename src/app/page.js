'use client'

import Image from 'next/image'
import React, { useState, useEffect, useContext } from 'react';
import { CrowdFundingContext } from './context/CrowdFunding';
import { Hero, Card, Popup } from "./components";


export default function Home() {
  const {
    titleData, 
    getCampaigns, 
    createCampaign, 
    donate,
    getUserCampaigns, 
    getDonations } = useContext(CrowdFundingContext);

  const [allCampaign, setAllCampaign] = useState([]);
  const [userCampaign, setUserCampaign] = useState([]);

  // useEffect(() => {
  //   const getCampaignsData = getCampaigns();
  //   const userCampaignsData = getUserCampaigns();
  //   return async () => {
  //     const allData = await getCampaignsData;
  //     const userData = await userCampaignsData;
  //     console.log(allData);
  //     console.log(userData);
  //     setAllCampaign(allData);
  //     setUserCampaign(userData);
  //   };
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getCampaigns();
        const userData = await getUserCampaigns();
        setAllCampaign(allData);
        setUserCampaign(userData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //DONATE POPUP MODAL
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState("");
  console.log(donateCampaign);

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} getCampaigns={getCampaigns}/>
      <Card
        title="All Listed Campaign"
        allCampaign={allCampaign}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign}
         />
      <Card
        title="Your Created Campaign"
        allCampaign={userCampaign}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign} />

      {openModal && (
        <Popup 
          setOpenModal={setOpenModal}
          getDonations={getDonations}
          donate={donateCampaign}
          donateToCampaign={donate}
          // getCampaigns, 
          // createCampaign, 
          // donate,
          // getUserCampaigns, 
          // getDonation
        />
      )}
    </>
  )
}
