interface DestinationCurrencyCardsProps {
    currency: string;
    exchangeRate: string;
    currencySymbol: string;
}

const DestinationCurrencyCards: React.FC<DestinationCurrencyCardsProps> = ({
    currency,
    exchangeRate,
    currencySymbol
}) => {
    return (
        <div className="w-full bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1 sm:mb-2">Currency</h3>
                    <p className="text-base font-medium">{currency}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1 sm:mb-2">Exchange Rate</h3>
                    <p className="text-base font-medium">${1} USD = {currencySymbol} {exchangeRate}</p>
                </div>
            </div>
        </div>
    );
};

export default DestinationCurrencyCards;
