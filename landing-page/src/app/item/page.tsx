'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import destinationsData from '@/data/destinations.json';
import RecommendationsBar from '../components/recommendationsBar';

function ItemContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  // Find the destination that matches the ID
  const destination = destinationsData.destinations.find(
    dest => dest.id === Number(id)
  ) || destinationsData.destinations[0]; // Fallback to first destination if ID not found

  return (
    <div className="max-w-6xl w-full space-y-12 mt-auto">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold lowercase">
          {destination.cityName}
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 lowercase">
          {destination.cityRegion} • {destination.country}
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
          <p className="text-gray-700 text-lg leading-relaxed">
            {destination.cityDescription}
          </p>
        </div>
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
        <ItemContent />
      </Suspense>
    </div>
  );
}
