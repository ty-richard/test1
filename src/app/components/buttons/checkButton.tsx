import { CheckCircleIcon as CheckCircleOutline } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';

interface CheckButtonProps {
  isChecked: boolean;
  onToggle: () => void;
  className?: string;
}

const CheckButton: React.FC<CheckButtonProps> = ({ 
  isChecked, 
  onToggle,
  className = "text-navy hover:text-navy/70"
}) => {
  return (
    <button 
      onClick={onToggle}
      className={className}
      aria-label={isChecked ? "Mark as unchecked" : "Mark as checked"}
    >
      {isChecked ? (
        <CheckCircleSolid 
          className="h-6 w-6 text-navy-500"
        />
      ) : (
        <CheckCircleOutline 
          className="h-6 w-6 text-navy"
        />
      )}
    </button>
  );
};

export default CheckButton; 