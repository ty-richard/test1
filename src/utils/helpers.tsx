import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import User from '../types/user';

/**
 * Converts a number (1-5) to corresponding dollar sign symbols
 * @param value - Number between 1 and 5
 * @returns String of dollar signs corresponding to the input number
 */
export const getPriceSymbols = (value: number): string => {
  // Ensure value is between 1 and 5
  const normalizedValue = Math.min(Math.max(1, value), 5);
  
  // Create and return string with repeated $ symbols
  return '$'.repeat(normalizedValue);
};

/**
 * Renders a star rating component with the given rating
 * @param rating - Number between 0 and 5
 * @returns JSX element displaying star rating
 */
export const renderStarRating = (rating: number) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) =>
        index < rating ? (
          <StarIconSolid key={index} className="h-5 w-5 text-navy" />
        ) : (
          <StarIcon key={index} className="h-5 w-5 text-navy" />
        )
      )}
    </div>
  );
};

/**
 * Formats a date into month, day, and year components
 * @param date - Date string to format
 * @returns Object containing formatted month, day, and year
 */
export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return {
    month: dateObj.toLocaleString('en-US', { month: 'short' }),
    day: dateObj.getDate(),
    year: dateObj.getFullYear(),
  };
};

/**
 * Determines user entitlement status based on premium status
 * @param user - User object containing premium status
 * @returns Boolean indicating if user has premium access
 */
export const getUserEntitlement = (user: User): boolean => {
  return user.premiumUser;
};