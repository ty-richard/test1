import { useState } from 'react';

interface RecommendationItemProps {
  id: string;
  title: string;
  onSelect: (title: string) => void;
}

const RecommendationItem = ({ id, title, onSelect }: RecommendationItemProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onSelect(title);
  };

  return (
    <button
      id={id}
      onClick={handleClick}
      className={`
        w-full h-16 md:w-32 md:h-32
        rounded-lg
        transition-colors
        duration-200
        text-3xl
        ${isSelected 
          ? 'bg-blue-500 text-white' 
          : 'bg-white text-blue-500 border-2 border-blue-500'
        }
      `}
    >
      {title}
    </button>
  );
};

export default RecommendationItem;
