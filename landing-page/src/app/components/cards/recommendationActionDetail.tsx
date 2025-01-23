import React, { useState } from 'react';
import Image from 'next/image';
import { getPriceSymbols } from '../../../utils/helpers';
import destinationsHotels from '@/data/destinationsHotels.json';
import destinationsEats from '@/data/destinationsEats.json';
import { Hotel } from '@/types/hotels';
import { Restaurant } from '@/types/resturants';
import { ArrowsPointingOutIcon, BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid, CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';
import ExpandedRecommendationCard from './expandedRecommendationCard';

type Recommendation = Hotel | Restaurant;

interface RecommendationActionDetailProps {
  id: string;
  recommendationType: 'eat' | 'stay';
}

const RecommendationActionDetail: React.FC<RecommendationActionDetailProps> = ({ id, recommendationType }) => {
  const getRecommendations = () => {
    const cityId = parseInt(id);
    if (recommendationType === 'eat') {
      return destinationsEats.resturants.filter(restaurant => restaurant.cityId === cityId);
    } else {
      return destinationsHotels.hotels.filter(hotel => hotel.cityId === cityId);
    }
  };

  const initialRecommendations = getRecommendations();
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);

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
      {recommendations.map((item) => (
        <div 
          key={item.id} 
          className="flex flex-col sm:flex-row border rounded-lg shadow-sm overflow-hidden mb-4 relative"
        >
          <div 
            className="absolute right-4 sm:top-4 top-[8px] z-10" 
            onClick={() => setSelectedRecommendation(item)}
          >
            <ArrowsPointingOutIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer bg-white rounded-full" />
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

          <div className="w-2/3 p-4">
            <h3 className="text-xl text-gray-600 mb-2 lowercase">
              {recommendationType === 'eat' ? 'Restaurant' : 'Hotel'}
            </h3>
            <h2 className="text-2xl font-semibold lowercase">
              {item.name}
            </h2>
            <p className="text-gray-600 mt-2">{item.cityName} | ${getPriceSymbols(item.price ?? 0)}</p>
            <p className="text-gray-600 mt-2">Contact Info</p>
            <div className="flex gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaved(item.id.toString());
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                {item.bookmarked ? (
                  <BookmarkSolid className="h-6 w-6 text-blue-500" />
                ) : (
                  <BookmarkOutline className="h-6 w-6" />
                )}
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleChecked(item.id.toString());
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <CheckCircleSolid 
                  className={`h-6 w-6 transition-colors ${
                    item.checked 
                      ? 'text-green-500' 
                      : 'text-gray-200'
                  }`}
                />
              </button>
            </div>
            <div className="mt-2 text-md italic">{item.keywords}</div>
          </div>
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
