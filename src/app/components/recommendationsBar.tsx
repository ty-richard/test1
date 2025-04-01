import React, { useState } from 'react';
import RecommendationItem from './recommendationItem';
import RecommendationActionDetail from './cards/recommendationActionDetail';
import DestinationWeatherCards from './cards/destinationWeatherCards';
import DestinationInfoCards from './cards/destinationInfoCards';
import DestinationCurrencyCards from './cards/destinationCurrencyCards';
import { Destination } from '@/types/destination';
import { dm_sans } from '@/app/fonts';

interface RecommendationsBarProps {
  id: string;
  destination: Destination;
}

const RecommendationsBar: React.FC<RecommendationsBarProps> = ({ id, destination }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const hasRecommendationItem = typeof RecommendationItem !== 'undefined';
  const handleRecommendationClick = (type: string, isSelected: boolean) => {
    setSelectedType(isSelected ? type : null);
  };

  return (
    <div className="w-full" id={id}>
      <div className={`text-3xl text-black font-medium mb-4 lowercase ${dm_sans.className}`}>
        recommendations
      </div>
      
      {hasRecommendationItem && (
        <>
          <div className="grid grid-cols-3 md:grid-cols-6 bg-light rounded-lg p-4 gap-4">
            <RecommendationItem 
              id={id} 
              title="eat" 
              isSelected={selectedType === 'eat'}
              onSelect={handleRecommendationClick} 
            />
            <RecommendationItem 
              id={id} 
              title="stay" 
              isSelected={selectedType === 'stay'}
              onSelect={handleRecommendationClick} 
            />
            <RecommendationItem 
              id={id} 
              title="go" 
              isSelected={selectedType === 'go'}
              onSelect={handleRecommendationClick} 
            />
            <RecommendationItem 
              id={id} 
              title="read" 
              isSelected={selectedType === 'read'}
              onSelect={handleRecommendationClick} 
            />
            <RecommendationItem 
              id={id} 
              title="watch" 
              isSelected={selectedType === 'watch'}
              onSelect={handleRecommendationClick} 
            />
            <RecommendationItem 
              id={id} 
              title="listen" 
              isSelected={selectedType === 'listen'}
              onSelect={handleRecommendationClick} 
            />
          </div>
          
          {(selectedType === 'eat' || selectedType === 'stay') && (
            <div className="mt-8">
              <RecommendationActionDetail 
                id={id} 
                recommendationType={selectedType as 'eat' | 'stay'} 
              />
            </div>
          )}
        </>
      )}

      {!selectedType && (
        <div className="bg-light rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="h-full flex">
              <DestinationWeatherCards
                weather={destination.weather}
                weatherCondition={destination.weatherCondition}
                temperatureHigh={destination.temperatureHigh}
                temperatureLow={destination.temperatureLow}
              />
            </div>
            <div className="h-full flex">
              <DestinationInfoCards
                keywords={destination.keywords}
              />
            </div>
            <div className="h-full flex">
              <DestinationWeatherCards
                weather={destination.weather}
                weatherCondition={destination.weatherCondition}
                temperatureHigh={destination.temperatureHigh}
                temperatureLow={destination.temperatureLow}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="h-full flex">
              <DestinationCurrencyCards
                currency={destination.currency}
                exchangeRate={destination.exchangeRate}
                currencySymbol={destination.currencySymbol}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationsBar;
