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
