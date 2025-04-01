'use client'

import { useState } from 'react'
import HomeSearchBox from './homeSearchBox'
import HomeMap from './homeMap'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const HomeToggleItem = () => {
  const [showSearch, setShowSearch] = useState(true)

  return (
    <div className="relative w-screen -ml-[max(0px,calc((100vw-100%)/2))] mb-10">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <h4 className="text-center mb-4">
          discover thousands of{' '}
          <br />
          <span className="font-bold">curated, trusted & personalized</span>
          <br />
          travel recommendations
        </h4>
        <div className="relative w-[300px] h-10 bg-white rounded-lg shadow-md p-1">
          {/* Sliding background */}
          <div
            className={`absolute inset-y-1 w-[148px] bg-blue-500 rounded-md transition-all duration-300 ease-in-out ${
              showSearch ? 'left-1' : 'left-[151px]'
            }`}
          />
          
          {/* Button container */}
          <div className="relative flex w-full h-full">
            {/* Search button */}
            <button
              onClick={() => setShowSearch(true)}
              className={`flex-1 rounded-md transition-colors duration-300 z-10 ${
                showSearch ? 'text-white' : 'text-gray-700'
              }`}
            >
              DESTINATIONS
            </button>
            
            {/* Map button */}
            <button
              onClick={() => setShowSearch(false)}
              className={`flex-1 rounded-md transition-colors duration-300 z-10 ${
                !showSearch ? 'text-white' : 'text-gray-700'
              }`}
            >
              MAP
            </button>
          </div>
        </div>
        
        {/* New Search Input */}
        <div className="relative mt-4 mb-4 w-[300px]">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="JUST SAY WHERE"
            className="w-full pl-10 pr-4 py-2 bg-white rounded-lg shadow-md outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>
      
      <div className="w-screen -ml-[max(0px,calc((100vw-100%)/2))]">
        {showSearch ? <HomeSearchBox /> : <HomeMap />}
      </div>
    </div>
  )
}

export default HomeToggleItem
