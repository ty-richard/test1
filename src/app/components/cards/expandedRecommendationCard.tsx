import React, { useState } from 'react';
import Image from 'next/image';
import { getPriceSymbols } from '../../../utils/helpers';
import { XMarkIcon } from '@heroicons/react/24/outline';
import BookmarkButton from '../buttons/bookmarkButton';
import CheckButton from '../buttons/checkButton';
import { roboto_serif, dm_sans, inter } from '@/app/fonts';
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
            <div className="min-h-[400px]">
              <h3 className={`text-2xl text-navy mb-2 lowercase ${roboto_serif.className}`}>
                {recommendationType === 'eat' ? 'Restaurant' : 'Hotel'}
              </h3>
              <h2 className={`text-3xl font-semibold text-navy lowercase ${dm_sans.className}`}>
                {recommendation.name}
              </h2>
              <p className={`text-navy mt-4 text-lg ${inter.className}`}>
                {recommendation.cityName} | ${getPriceSymbols(recommendation.price ?? 0)}
              </p>
              <p className={`text-navy mt-4 text-lg ${inter.className}`}>Contact Info</p>
              <div className="flex gap-3 mt-4">
                <BookmarkButton 
                  isBookmarked={isBookmarked}
                  onToggle={toggleSaved}
                />
                <CheckButton 
                  isChecked={isChecked}
                  onToggle={toggleChecked}
                />
              </div>
              <div className={`mt-4 text-navy text-lg ${inter.className}`}>{recommendation.description}</div>
              <div className={`mt-4 text-navy text-lg ${inter.className}`}>Other Reviews: TODO</div>
            </div>
          </div>
          <div className="w-full px-4 sm:hidden flex flex-col gap-2 mb-6">
            <a 
              href="https://www.booking.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`w-full block border-2 border-navy bg-mint text-navy py-2 px-4 rounded-lg shadow-md hover:bg-mint-100 transition-colors text-center ${inter.className}`}
            >
              BOOK ON BOOKING.COM
            </a>
            <a 
              href="https://www.expedia.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`w-full block border-2 border-navy bg-navy text-mint py-2 px-4 rounded-lg shadow-md hover:bg-navy-100 transition-colors text-center ${inter.className}`}
            >
              BOOK ON EXPEDIA
            </a>
          </div>

          <div className="hidden sm:flex absolute bottom-[4rem] left-0 right-0 sm:w-1/2 flex-col items-center gap-2 px-4">
            <a 
              href="https://www.booking.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`w-full block border-2 border-navy bg-mint text-navy py-2 px-4 rounded-lg shadow-md hover:bg-mint-100 transition-colors text-center ${inter.className}`}
            >
              BOOK ON BOOKING.COM
            </a>
            <a 
              href="https://www.expedia.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`w-full block border-2 border-navy bg-navy text-mint py-2 px-4 rounded-lg shadow-md hover:bg-navy-100 transition-colors text-center ${inter.className}`}
            >
              BOOK ON EXPEDIA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedRecommendationCard;