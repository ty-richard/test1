'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPriceSymbols } from '../../utils/helpers';
import Image from 'next/image';
import destinationsData from '@/data/destinations.json';
import destinationsHotels from '@/data/destinationsHotels.json';
import destinationsEats from '@/data/destinationsEats.json';
import { Hotel } from '@/types/hotels';
import { Restaurant } from '@/types/resturants';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid, CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';
import ExpandedInfoCell from '../components/expandedInfoCell';

function ItemContent() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const cityId = searchParams.get('cityId');
  const recommendationType = searchParams.get('recommendationType');
  
  const destination = destinationsData.destinations.find(
    dest => dest.id === Number(cityId)
  ) || destinationsData.destinations[0];

  const getRecommendationData = (): Hotel | Restaurant | null => {
    if (!recommendationType || !id) return null;

    if (recommendationType === 'stay') {
      return destinationsHotels.hotels.find(
        hotel => hotel.id === Number(id) && hotel.cityId === Number(cityId)
      ) || null;
    } else if (recommendationType === 'eat') {
      return destinationsEats.resturants.find(
        restaurant => restaurant.id === Number(id) && restaurant.cityId === Number(cityId)
      ) || null;
    }
    return null;
  };

  const recommendationData = getRecommendationData();

  useEffect(() => {
    if (recommendationData) {
      setIsBookmarked(recommendationData.bookmarked || false);
      setIsChecked(recommendationData.checked || false);
    }
  }, [recommendationData]);

  const toggleSaved = () => {
    setIsBookmarked(prev => !prev);
  };

  const toggleChecked = () => {
    setIsChecked(prev => !prev);
  };

  console.log("TESTING", recommendationData, destination);

  return (
    <div className="w-full space-y-8">
      <div className="w-full h-[400px] mt-[68rem] md:mt-[65rem] relative overflow-hidden">
        <Image
          src={recommendationData?.image || destination.countryImage}
          alt={`${recommendationData?.name || destination.cityName} image`}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl text-gray-600 lowercase">
            {recommendationType === 'eat' ? 'Restaurant' : 'Hotel'}
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={toggleSaved}
              className="text-gray-500 hover:text-gray-700"
            >
              {isBookmarked ? (
                <BookmarkSolid className="h-6 w-6 text-blue-500" />
              ) : (
                <BookmarkOutline className="h-6 w-6" />
              )}
            </button>
            <button 
              onClick={toggleChecked}
              className="text-gray-500 hover:text-gray-700"
            >
              <CheckCircleSolid 
                className={`h-6 w-6 transition-colors ${
                  isChecked 
                    ? 'text-green-500' 
                    : 'text-gray-200'
                }`}
              />
            </button>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold lowercase">
          {recommendationData?.name || destination.cityName}
        </h1>

        <p className="text-xl text-gray-600">
          {destination.cityRegion}, {destination.country} 
          {recommendationData?.price && ` | $${getPriceSymbols(recommendationData.price)}`}
        </p>

        <p className="text-gray-700 text-lg leading-relaxed">
          {recommendationData?.description || destination.cityDescription}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto px-4">
        <a 
            href="https://www.booking.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block bg-white text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors text-center"
        >
            BOOK ON BOOKING.COM
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto px-4">
        <a 
            href="https://www.expedia.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block bg-white text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors text-center"
        >
            BOOK ON EXPEDIA
        </a>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <ExpandedInfoCell 
          title="Contact Info"
          contactInfo={{
            phoneNumber: recommendationData?.phoneNumber || '',
            website: recommendationData?.website || '',
            address: recommendationData?.address || ''
          }}
        />
        <ExpandedInfoCell title="Other Reviews" />
        <ExpandedInfoCell title="All Booking Providers" />
      </div>
    </div>
  );
}

export default function ItemPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <Suspense fallback={<div>Loading...</div>}>
        <ItemContent />
      </Suspense>
    </div>
  );
}
