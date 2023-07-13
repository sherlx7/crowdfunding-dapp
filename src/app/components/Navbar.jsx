'use client';

import React, {useState, useEffect, useContext} from 'react';
import { CrowdFundingContext } from '../context/CrowdFunding';
import {Logo,Menu} from "./index";

const Navbar = () => {
  const {currentAccount,connectWallet }= useContext(CrowdFundingContext);
  const [isMenuOpen, setMenuOpen] = useState("");

  const menuList = ["White Paper", "Project","Donation","Members"];

  return (
    <div className="backgroundMain">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl
      md:px-24 lg:px-8 ">
        <div className="relative flex items-center justify-between ">
          <div className='flex items-center'>
            <a 
              href="/"
              aria-label="Company"
              title="Company"
              className='inline-flex items-center mr-8'
            >
              <Logo color="text-white" />
              <span className='ml-2 text-xl font-bold tracking-wide text-gray-100 
              uppercase '>
                Company
              </span>
            </a> 
            <ul className="flex items-center space-x-8 lg:flex" >
              {menuList.map((el,i)=>{
                <li key={i+1}>
                  <a
                    href="/"
                    aria-label="Our Product"
                    title="Our Product"
                    className="font-medium tracking-wide text-gray-100 transition-colors
                    duration-200 hover:text-teal-accent-400"
                  >
                    {el}
                  </a>
                </li>
              })}
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  )

}

export default Navbar