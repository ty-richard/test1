"use client";

import React from 'react';
import travelogueData from '@/data/travelogue.json';
import userData from '@/data/user.json';
import TravelogueCountry from '@/app/components/cards/travelogueCountry';
import TravelogueHotels from '@/app/components/cards/travelogueHotels';
import { dm_sans, inter, roboto_serif } from '@/app/fonts';

const travelogue = travelogueData;
const user = userData.user;

export default function TraveloguePage() {
  return (
    <main className="container mx-auto px-4 py-8 mb-4">
      <div className="relative mb-8">
        <h1 className={`text-5xl font-bold mb-8 text-center text-navy lowercase ${dm_sans.className}`}>
          My Travelogue
        </h1>
        <svg
          className="absolute left-1/2 -translate-x-1/2 -bottom-2"
          width="240"
          height="12"
          viewBox="0 0 240 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 10C50 4 190 4 238 10"
            stroke="#A5D6B7"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="border-2 border-navy bg-skyBlue p-4 rounded-lg text-center">
          <h2 className={`text-navy text-xl mb-2 uppercase ${inter.className}`}>Countries<br />Visited</h2>
          <p className={`text-navy text-3xl ${roboto_serif.className}`}>{user.countriesVisited}</p>
        </div>
        <div className="border-2 border-navy bg-skyBlue p-4 rounded-lg text-center">
          <h2 className={`text-navy text-xl mb-2 uppercase ${inter.className}`}>Most Recent Trip</h2>
          <p className={`text-navy text-3xl uppercase ${roboto_serif.className}`}>{user.recentTrip}</p>
        </div>
        <div className="border-2 border-navy bg-skyBlue p-4 rounded-lg text-center">
          <h2 className={`text-navy text-xl mb-2 uppercase ${inter.className}`}>Logged<br />Places</h2>
          <p className={`text-navy text-3xl ${roboto_serif.className}`}>{user.tripsSaved}</p>
          <p className={`text-navy ${roboto_serif.className}`}>Places</p>
        </div>
      </div>
      
      {/* New Timeline Layout */}
      <div className="mt-12 relative flex flex-col md:flex-row">
        {/* Hotels Column */}
        <div className="w-full md:w-1/2 p-4">
          <TravelogueHotels travelogue={travelogue} />
        </div>

        {/* Vertical Timeline */}
        <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-1 bg-navy h-full">
          {/* Up Arrow */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="navy">
              <path d="M12 4l-8 8h16l-8-8z" />
            </svg>
          </div>
        </div>

        {/* Mobile Timeline (left side) */}
        <div className="md:hidden absolute left-0 top-0 w-1 bg-navy h-full">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="navy">
              <path d="M12 4l-8 8h16l-8-8z" />
            </svg>
          </div>
        </div>

        {/* Countries Column */}
        <div className="w-full md:w-1/2 p-4">
          <TravelogueCountry travelogue={travelogue} />
        </div>
      </div>
    </main>
  );
}
