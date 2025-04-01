import { dm_sans } from '@/app/fonts';

interface RecommendationItemProps {
  id: string;
  title: string;
  isSelected: boolean;
  onSelect: (title: string, isSelected: boolean) => void;
}

const RecommendationItem = ({ id, title, isSelected, onSelect }: RecommendationItemProps) => {
  const handleClick = () => {
    onSelect(title, !isSelected);
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
        ${dm_sans.className}
        ${isSelected 
          ? 'bg-navy text-skyBlue border-2 border-navy' 
          : 'bg-skyBlue text-navy border-2 border-navy'
        }
      `}
    >
      {title}
    </button>
  );
};

export default RecommendationItem;
