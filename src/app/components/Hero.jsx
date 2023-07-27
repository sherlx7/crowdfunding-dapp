'use client';

import React,{useState} from 'react'

const Hero= ({titleData,createCampaign,getCampaigns}) => {
  const [campaign,setCampaign] = useState({
    title:"",
    description:"",
    amount:"",
    deadline:"",
  });

  const [createdCampaign, setCreatedCampaign] = useState(false);

  const createNewCampaign = async (e) => {
    e.preventDefault();
    try {
      const data = await createCampaign(campaign);
      console.log("created and pass control to hero component")
      setCreatedCampaign(true)
      setTimeout(() => {
        setCreatedCampaign(false); // Set the modal state to close
      }, 5000);

      console.log("point before getting campaign")

      const getCampaignsData = await getCampaigns()
      console.log("point after getting campaign")

      console.log(getCampaignsData)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='relative'>
      <span className='coverLine'></span>
      <div className='relative bg-opacity-75 backgroundMain'>
        <svg
        className='absolute inset-x-0 bottom-0 text-white'
        viewBox='0 0 1160 163'>
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676
            88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036
            162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76
            162.5 -44 162.5 -104 162.5H-164V13Z"
          >
          </path>
        </svg>
      <div className='relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full 
      lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
        <div className='flex flex-row items-center justify-between sm:flow-col'>
          <div className='w-full  pl-12 max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12'>
            <h2 className='max-w-lg mb-6 font-sans text-2xl font-bold tracking-tight
            text-white sm:text-5xl sm:leading-none ' >
              CrowdFunding CK
            </h2>
            <p className='max-w-xl mb-4 text-base text-gray-200 md:text-lg'>
              Create your crowd funding campaigns here!
            </p>
            <a 
              href="/"
              aria-label=""
              className='inline-flex items-center font-semibold tracking-wider 
              transition-colors duration-200 text-teal-accent-400 
              hover:text-teal-accent-700 text-gray-200'
              >
                Learn more
            </a>
          </div>
          <div className='w-full pr-32 max-w-xl xl:px-12 xl:w-5/12'>
            <div className='bg-white rounded shadow-2xl p-7'>
              <h3 className='mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl'>
                Campaign
              </h3>
              <form>
                <div className='mb-1 sm:mb-2'>
                  <label
                  className='inline-block mb-1 font-medium'
                  htmlFor='firstName'>
                    Title
                  </label>
                  <input
                    onChange={(e)=>
                    setCampaign({
                      ...campaign,
                      title:e.target.value
                    })}
                    placeholder="Title"
                    required
                    type="text"
                    className='flex-grow w-full h-12 px-4 mb-2 transition 
                    duration-200 bg-white border border-gray-300 rounded shadow-sm
                    appearance-none focus:border-deep-purple-accent-400 
                    focus:outline-none focus:shadow-outline'
                    id="firstName"
                    name="firstName"
                  /> 
                </div>
                <div className='mb-1 sm:mb-2'>
                  <label
                  className='inline-block mb-1 font-medium'
                  htmlFor='lastName'>
                    Description
                  </label>
                  <input
                    onChange={(e)=>
                    setCampaign({
                      ...campaign,
                      description:e.target.value
                    })}
                    placeholder="Description"
                    required
                    type="text"
                    className='flex-grow w-full h-12 px-4 mb-2 transition 
                    duration-200 bg-white border border-gray-300 rounded shadow-sm
                    appearance-none focus:border-deep-purple-accent-400 
                    focus:outline-none focus:shadow-outline'
                    id="lastName"
                    name="lastName"
                  /> 
                </div>
                <div className='mb-1 sm:mb-2'>
                  <label
                  className='inline-block mb-1 font-medium'
                  htmlFor='email'>
                    Target Amount
                  </label>
                  <input
                    onChange={(e)=>
                    setCampaign({
                      ...campaign,
                      amount:e.target.value
                    })}
                    placeholder="Amount"
                    required
                    type="text"
                    className='flex-grow w-full h-12 px-4 mb-2 transition 
                    duration-200 bg-white border border-gray-300 rounded shadow-sm
                    appearance-none focus:border-deep-purple-accent-400 
                    focus:outline-none focus:shadow-outline'
                    id="email"
                    name="email"
                  /> 
                </div>
                <div className='mb-1 sm:mb-2'>
                  <label
                  className='inline-block mb-1 font-medium'
                  htmlFor='email'>
                    Deadline
                  </label>
                  <input
                    onChange={(e)=>
                    setCampaign({
                      ...campaign,
                      deadline:e.target.value
                    })}
                    placeholder="Date"
                    required
                    type="date"
                    className='flex-grow w-full h-12 px-4 mb-2 transition 
                    duration-200 bg-white border border-gray-300 rounded shadow-sm
                    appearance-none focus:border-deep-purple-accent-400 
                    focus:outline-none focus:shadow-outline'
                    id="email"
                    name="email"
                  /> 
                </div>
                <div className='mb-1 sm:mb-2'>
                  <button
                  onClick={(e) => createNewCampaign(e)}
                    type="text"
                    className='flex-grow w-full h-12 px-4 mb-2 transition 
                    duration-200 bg-white border border-gray-300 rounded shadow-sm
                    appearance-none focus:border-deep-purple-accent-400 
                    focus:outline-none focus:shadow-outline'
                    >
                      Create Campaign
                    </button>
                    {createdCampaign && (
                              <div className="modal">
                              <h2>Campaign Created Successfully!</h2>
                              {/* Add more content or actions as needed */}
                            </div>
                    )}
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;
