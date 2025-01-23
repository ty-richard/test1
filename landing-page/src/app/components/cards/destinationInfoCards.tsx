interface DestinationInfoCardsProps {
    keywords: string;
  }
  
  const DestinationInfoCards: React.FC<DestinationInfoCardsProps> = ({keywords}) => {
    const keywordsList = keywords.split(',').map(word => word.trim());

    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full flex flex-col">
        <div className="flex flex-col items-start flex-grow space-y-3">
          <h3 className="text-xl font-medium text-gray-800">Known For</h3>
          <ul className="list-disc pl-5 space-y-1">
            {keywordsList.map((keyword, index) => (
              <li key={index} className="text-gray-700">{keyword}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default DestinationInfoCards;