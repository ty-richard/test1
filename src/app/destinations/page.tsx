'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import destinationsData from '@/data/destinations.json';
import RecommendationsBar from '../components/recommendationsBar';
import { dm_sans, inter } from '@/app/fonts';
import { DocumentDuplicateIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon} from '@heroicons/react/24/solid';
import { getUserEntitlement } from '@/utils/helpers';
import userData from '@/data/user.json';

function DestinationContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const destination = destinationsData.destinations.find(
    dest => dest.id === Number(id)
  ) || destinationsData.destinations[0]; // Fallback to first destination if ID not found
  const hasAccess = getUserEntitlement(userData.user);

  return (
    <div className="max-w-6xl w-full space-y-12 mt-auto mb-20">
      <div className="text-center text-navy space-y-4">
        <h1 className={`text-5xl md:text-6xl font-bold lowercase ${dm_sans.className}`}>
          {destination.cityName}
        </h1>
        <h2 className={`text-xl md:text-2xl lowercase ${inter.className}`}>
          {destination.cityRegion} | {destination.country}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="w-full md:w-1/3">
          <Image
            src={destination.countryImage}
            alt={`${destination.cityName} image`}
            width={1000}
            height={600}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div className="w-full md:w-2/3">
          <p className={`text-navy text-lg leading-relaxed ${inter.className}`}>
            {destination.cityDescription}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-full border-t-2 border-navy" />
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
          <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-start">
            <button className="p-2 rounded-full bg-navy border-2 border-navy hover:opacity-80 transition-opacity">
              <DocumentDuplicateIcon className="w-5 h-5 text-light" />
            </button>
            <button className="p-2 rounded-full bg-light border-2 border-navy hover:bg-skyBlue transition-colors">
              <GlobeAltIcon className="w-5 h-5 text-navy" />
            </button>
          </div>
          {!hasAccess && (
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-mint border-2 border-navy font-bold text-navy uppercase ${inter.className} hover:opacity-80 transition-opacity w-full sm:w-auto justify-center`}>
              Personalize <LockClosedIcon className="w-5 h-5 text-navy" />
            </button>
          )}
        </div>
        <div className="w-full border-t-2 border-navy" />
      </div>
      <RecommendationsBar
        id={destination.id.toString()}
        destination={destination}
      />
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <Suspense fallback={<div>Loading...</div>}>
        <DestinationContent />
      </Suspense>
    </div>
  );
}
