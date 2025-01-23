interface DestinationWeatherCardsProps {
  weather: number;
  weatherCondition: string;
  temperatureHigh: number;
  temperatureLow: number;
}

const DestinationWeatherCards: React.FC<DestinationWeatherCardsProps> = ({
  weather,
  weatherCondition,
  temperatureHigh,
  temperatureLow,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full flex flex-col">
      <div className="flex flex-col items-start flex-grow space-y-3">
        <h3 className="text-xl font-medium text-gray-800">weather</h3>
        <p className="text-4xl font-bold">{weather}°</p>
        <p className="text-gray-600">{weatherCondition}</p>
        <p className="text-sm text-gray-700">
          H: {temperatureHigh}° | L: {temperatureLow}°
        </p>
      </div>
    </div>
  );
};

export default DestinationWeatherCards;
