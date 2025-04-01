import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { getPriceSymbols } from '../../../utils/helpers';
import destinationsHotels from '@/data/destinationsHotels.json';
import destinationsEats from '@/data/destinationsEats.json';
import { Hotel } from '@/types/hotels';
import { Restaurant } from '@/types/resturants';
import { ArrowsPointingOutIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ExpandedRecommendationCard from './expandedRecommendationCard';
import BookmarkButton from '../buttons/bookmarkButton';
import CheckButton from '../buttons/checkButton';
import Link from 'next/link';
import { inter, dm_sans, roboto_serif } from '@/app/fonts';
import { useLoadScript, Libraries } from "@react-google-maps/api";
import { geocodeAddress } from '../../../utils/geocoding';
import RecommendationsMap from '../maps/recommendationsMap';

type Recommendation = Hotel | Restaurant;

interface RecommendationActionDetailProps {
  id: string;
  recommendationType: 'eat' | 'stay';
}

const RecommendationActionDetail: React.FC<RecommendationActionDetailProps> = ({ id, recommendationType }) => {
  const libraries: Libraries = ['places'];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
  });

  const getRecommendations = useCallback(() => {
    const cityId = parseInt(id);
    if (recommendationType === 'eat') {
      return destinationsEats.resturants.filter(restaurant => restaurant.cityId === cityId);
    } else {
      return destinationsHotels.hotels.filter(hotel => hotel.cityId === cityId);
    }
  }, [id, recommendationType]);

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);

  useEffect(() => {
    const newRecommendations = getRecommendations();
    setRecommendations(newRecommendations);
    setSelectedRecommendation(null);
  }, [getRecommendations]);

  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [markers, setMarkers] = useState<Array<{
    id: string;
    position: { lat: number; lng: number };
    name: string;
    cityName: string;
    price?: number;
    keywords?: string;
    image: string;
    bookmarked?: boolean;
    checked?: boolean;
  }>>([]);

  useEffect(() => {
    const geocodeLocations = async () => {
      if (recommendations.length > 0) {
        try {
          const firstLocation = recommendations[0];
          const address = `${firstLocation.name}, ${firstLocation.cityName}`;
          const centerCoords = await geocodeAddress(address);
          setMapCenter(centerCoords);

          const markerPromises = recommendations.map(async (item) => {
            const address = `${item.name}, ${item.cityName}`;
            const coords = await geocodeAddress(address);
            return {
              id: item.id.toString(),
              position: coords,
              name: item.name,
              cityName: item.cityName,
              price: item.price,
              keywords: item.keywords,
              image: item.image,
              bookmarked: item.bookmarked,
              checked: item.checked
            };
          });

          const markerResults = await Promise.all(markerPromises);
          setMarkers(markerResults.map(item => ({
            id: item.id,
            position: item.position,
            name: item.name,
            cityName: item.cityName,
            price: item.price,
            keywords: item.keywords,
            image: item.image,
            bookmarked: item.bookmarked,
            checked: item.checked
          })));
        } catch (error) {
          console.error('Error geocoding addresses:', error);
        }
      }
    };

    if (isLoaded) {
      geocodeLocations();
    }
  }, [isLoaded, recommendations]);

  const toggleSaved = (itemId: string) => {
    setRecommendations(prevRecs => 
      prevRecs.map(item => 
        item.id.toString() === itemId 
          ? { ...item, bookmarked: !item.bookmarked }
          : item
      )
    );
  };

  const toggleChecked = (itemId: string) => {
    setRecommendations(prevRecs => 
      prevRecs.map(item => 
        item.id.toString() === itemId 
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  };

  return (
    <div className="w-full p-4">
      {!isLoaded ? (
        <div className="w-full h-[400px] mb-4 flex items-center justify-center bg-gray-100 rounded-lg">
          <p>Loading map...</p>
        </div>
      ) : (
        <RecommendationsMap mapCenter={mapCenter} markers={markers} />
      )}

      {recommendations.map((item) => (
        <div 
          key={item.id}
          className="flex flex-col sm:flex-row border rounded-lg shadow-sm overflow-hidden mb-4 relative"
          onClick={(e) => {
            // Prevent navigation if clicking on buttons
            if ((e.target as HTMLElement).closest('button')) {
              e.preventDefault();
            }
          }}
        >
          <div 
            className="absolute right-4 sm:top-4 top-[8px] z-10" 
            onClick={(e) => {
              e.preventDefault();
              setSelectedRecommendation(item);
            }}
          >
            <ArrowsPointingOutIcon className="h-6 w-6 text-navy hover:text-navy-700 cursor-pointer rounded-full" />
          </div>
          
          <div className="w-full sm:w-1/3 relative h-64 sm:h-48">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>

          <div className="w-2/3 p-4 text-navy">
            <h3 className={`text-xl mb-2 lowercase ${roboto_serif.className}`}>
              {recommendationType === 'eat' ? 'Restaurant' : 'Hotel'}
            </h3>
            <h2 className={`text-2xl font-semibold lowercase ${dm_sans.className}`}>
              {item.name}
            </h2>
            <p className={`text-navy mt-2 ${inter.className}`}>{item.cityName} | ${getPriceSymbols(item.price ?? 0)}</p>
            <p className={`text-navy mt-2 ${inter.className}`}>Contact Info</p>
            <div className="flex gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
              <BookmarkButton
                isBookmarked={item.bookmarked}
                onToggle={() => {
                  toggleSaved(item.id.toString());
                }}
                className="text-navy hover:text-navy-700"
              />
              <CheckButton
                isChecked={item.checked}
                onToggle={() => {
                  toggleChecked(item.id.toString());
                }}
                className="text-navy hover:text-gray-700"
              />
            </div>
            <div className="mt-2 text-md italic">{item.keywords}</div>
          </div>
          <Link 
            href={`/item?id=${item.id}&cityId=${item.cityId}&recommendationType=${recommendationType}`}
            key={item.id}
          >
            <div className="absolute right-4 sm:top-1/2 sm:-translate-y-1/2 bottom-4 sm:bottom-auto">
              <ChevronRightIcon className="h-6 w-6 text-navy" />
            </div>
          </Link>
        </div>
      ))}

      {selectedRecommendation && (
        <ExpandedRecommendationCard
          recommendation={selectedRecommendation}
          recommendationType={recommendationType}
          onClose={() => setSelectedRecommendation(null)}
          id={id}
          isOpen={true}
        />
      )}
    </div>
  );
};

export default RecommendationActionDetail;
