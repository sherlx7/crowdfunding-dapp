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

  const [allCampaign, setAllCampaign] = useState("");
  const [userCampaign, setUserCampaign] = useState("");

  useEffect(() => {
    const getCampaignsData = getCampaigns();
    const userCampaignsData = getUserCampaigns();
    return async () => {
      const allData = await getCampaignsData;
      const userData = await userCampaignsData;
      setAllCampaign(allData);
      setUserCampaign(userData);
    };
  }, []);

  //DONATE POPUP MODAL
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState("");
  console.log(donateCampaign);

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />
      <Card
        title="All Listed Campaign"
        allCampaign={allCampaign}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign} />
      <Card
        title="Your Created Campaign"
        allCampaign={userCampaign}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign} />

      {openModal && (
        <Popup 
          setOpenModal={setOpenModal}
          setDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  )
}
