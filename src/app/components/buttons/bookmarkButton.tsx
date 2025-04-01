import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
  className?: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ 
  isBookmarked, 
  onToggle,
  className = "text-navy hover:text-navy/70"
}) => {
  return (
    <button 
      onClick={onToggle}
      className={className}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarked ? (
        <BookmarkSolid className="h-6 w-6 text-navy" />
      ) : (
        <BookmarkOutline className="h-6 w-6 text-navy" />
      )}
    </button>
  );
};

export default BookmarkButton; 