import React, { useState } from 'react';
import Image from 'next/image';
import { getPriceSymbols } from '../../../utils/helpers';
import { BookmarkIcon as BookmarkOutline, XMarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid, CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';
import { Hotel } from '@/types/hotels';
import { Restaurant } from '@/types/resturants';

type Recommendation = Hotel | Restaurant;

interface ExpandedRecommendationCardProps {
  id: string;
  recommendationType: 'eat' | 'stay';
  onClose: () => void;
  recommendation: Recommendation;
  isOpen: boolean;
}

const ExpandedRecommendationCard: React.FC<ExpandedRecommendationCardProps> = ({ 
  recommendation,
  recommendationType,
  onClose,
  isOpen
}) => {
  const [isBookmarked, setIsBookmarked] = useState(recommendation.bookmarked);
  const [isChecked, setIsChecked] = useState(recommendation.checked);

  const toggleSaved = () => {
    setIsBookmarked(!isBookmarked);
  };

  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-11/12 max-w-4xl max-h-[90vh] rounded-lg overflow-y-auto relative">
        <div className="absolute right-4 sm:top-4 top-[8px] z-10">
          <XMarkIcon 
            className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer bg-white rounded-full" 
            onClick={onClose}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row overflow-hidden">
          <div className="w-full sm:w-1/2 relative h-96 sm:h-[250px] sm:mt-4 sm:ml-4">
            <Image
              src={recommendation.image}
              alt={recommendation.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>

          <div className="w-full sm:w-1/2 p-6">
            <h3 className="text-2xl text-gray-600 mb-2">
              {recommendationType === 'eat' ? 'Restaurant' : 'Hotel'}
            </h3>
            <h2 className="text-3xl font-semibold">
              {recommendation.name}
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              {recommendation.cityName} | ${getPriceSymbols(recommendation.price ?? 0)}
            </p>
            <p className="text-gray-600 mt-4 text-lg">Contact Info</p>
            <div className="flex gap-3 mt-4">
              <button 
                onClick={toggleSaved}
                className="text-gray-500 hover:text-gray-700"
              >
                {isBookmarked ? (
                  <BookmarkSolid className="h-8 w-8 text-blue-500" />
                ) : (
                  <BookmarkOutline className="h-8 w-8" />
                )}
              </button>
              <button 
                onClick={toggleChecked}
                className="text-gray-500 hover:text-gray-700"
              >
                <CheckCircleSolid 
                  className={`h-8 w-8 transition-colors ${
                    isChecked 
                      ? 'text-green-500' 
                      : 'text-gray-200'
                  }`}
                />
              </button>
            </div>
            <div className="mt-4 text-lg">{recommendation.description}</div>
            <div className="mt-4 text-lg">Other Reviews: TODO</div>
          </div>

          <div className="w-full px-4 sm:hidden flex flex-col gap-2 mb-6">
            <button className="w-full bg-white text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
              View Website
            </button>
            <button className="w-full bg-white text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
              Get Directions
            </button>
          </div>

          <div className="hidden sm:flex absolute bottom-[2rem] left-0 right-0 sm:w-1/2 flex-col items-center gap-2 px-4">
            <button className="w-full bg-white text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
              View Website
            </button>
            <button className="w-full bg-white text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedRecommendationCard;