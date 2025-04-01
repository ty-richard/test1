'use client';

import { useRouter } from 'next/navigation';
import { dm_sans } from '@/app/fonts';

const FreeCard = () => {
  const router = useRouter();

  const features = [
    "Ad Supported",
    "Unlimited recommendations",
    "Save recommendations to lists",
    "Share lists with friends and family",
    "Up to 5 saved lists",
    "Up to 10 saved recommendations per list",
    "Log your recommendations in Travelogue (up to 10 entries) "
  ];

  const handleFreeTrial = () => {
    localStorage.setItem('subscriptionType', 'free');
    router.push('/home');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-light rounded-lg shadow-lg h-full flex flex-col mb-4">
      <h2 className={`text-2xl text-navy font-bold text-center mb-6 ${dm_sans.className}`}>
        Free Account
      </h2>

      <ul className="list-disc pl-6 mb-6 text-left text-navy space-y-2 flex-grow">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <button
        onClick={handleFreeTrial}
        className={`w-full py-3 px-4 text-xl bg-navy text-white rounded-lg hover:bg-navy-700 transition-colors lowercase ${dm_sans.className}`}
      >
        continue with free account
      </button>
    </div>
  );
};

export default FreeCard;
