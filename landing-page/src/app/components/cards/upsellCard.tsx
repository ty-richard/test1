'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const UpsellCard = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const router = useRouter();

  const features = [
    "Display Ad Free",
    "Unlimited recommendations",
    "Unlimited saved recommendations and lists",
    "Share saved lists with friends and family",
    "Unlimited Travelogue entries",
    "Personalized recommendations",
    "The Xplorist Chat. Have a conversation with our AI travel agent to help you with your travel planning needs. Receive recommendations when you are on the go delivered directly to you via text message, WhatsApp, Apple Messages or in-app."
  ];

  const handleFreeTrial = () => {
    localStorage.setItem('subscriptionType', isAnnual ? 'annual' : 'monthly');
    router.push('/home');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg h-full flex flex-col mb-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        The Xplorist Premium
      </h2>

      <ul className="list-disc pl-6 mb-6 text-left space-y-2 flex-grow">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative w-[300px] h-10 bg-white rounded-lg shadow-md p-1">
          <div
            className={`absolute inset-y-1 w-[148px] bg-blue-500 rounded-md transition-all duration-300 ease-in-out ${
              isAnnual ? 'left-[151px]' : 'left-1'
            }`}
          />
          
          <div className="relative flex w-full h-full">
            <button
              onClick={() => setIsAnnual(false)}
              className={`flex-1 rounded-md transition-colors duration-300 z-10 ${
                !isAnnual ? 'text-white' : 'text-gray-700'
              }`}
            >
              MONTHLY
            </button>
            
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex-1 rounded-md transition-colors duration-300 z-10 ${
                isAnnual ? 'text-white' : 'text-gray-700'
              }`}
            >
              ANNUAL
            </button>
          </div>
        </div>
        <span className="text-sm font-medium">
          {isAnnual ? (
            <>
              $50 a year<br/>
              <span className="underline">includes 60 day free trial</span>
            </>
          ) : (
            <>
              $5 a month<br/>
              <span className="underline">includes 30 day free trial</span>
            </>
          )}
        </span>
      </div>

      <button
        onClick={handleFreeTrial}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors lowercase"
      >
        Activate Free Trial!
      </button>
    </div>
  );
};

export default UpsellCard;
