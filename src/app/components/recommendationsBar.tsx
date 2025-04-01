import React, { useState } from 'react';
import RecommendationItem from './recommendationItem';
import RecommendationActionDetail from './cards/recommendationActionDetail';
import DestinationWeatherCards from './cards/destinationWeatherCards';
import DestinationInfoCards from './cards/destinationInfoCards';
import DestinationCurrencyCards from './cards/destinationCurrencyCards';
import { Destination } from '@/types/destination';

interface RecommendationsBarProps {
  id: string;
  destination: Destination;
}

const RecommendationsBar: React.FC<RecommendationsBarProps> = ({ id, destination }) => {
  const [selectedType, setSelectedType] = useState<'eat' | 'stay' | null>(null);
  const [hasClickedRecommendation, setHasClickedRecommendation] = useState(false);
  
  const hasRecommendationItem = typeof RecommendationItem !== 'undefined';

  const handleRecommendationClick = (type: string) => {
    setHasClickedRecommendation(true);
    setSelectedType(type === 'eat' || type === 'stay' ? type : null);
  };

  return (
    <div className="w-full" id={id}>
      <div className="text-3xl font-medium mb-4 lowercase">
        recommendations
      </div>
      
      {hasRecommendationItem && (
        <>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <RecommendationItem id={id} title="eat" onSelect={handleRecommendationClick} />
            <RecommendationItem id={id} title="stay" onSelect={handleRecommendationClick} />
            <RecommendationItem id={id} title="go" onSelect={handleRecommendationClick} />
            <RecommendationItem id={id} title="read" onSelect={handleRecommendationClick} />
            <RecommendationItem id={id} title="watch" onSelect={handleRecommendationClick} />
            <RecommendationItem id={id} title="listen" onSelect={handleRecommendationClick} />
          </div>
          
          {selectedType && (selectedType === 'eat' || selectedType === 'stay') && (
            <div className="mt-8">
              <RecommendationActionDetail 
                id={id} 
                recommendationType={selectedType} 
              />
            </div>
          )}
        </>
      )}

      {!hasClickedRecommendation && (
        <div>
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
