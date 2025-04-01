'use client';
import { useRouter } from 'next/navigation';

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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-6">
        Free Account
      </h2>

      <ul className="list-disc pl-6 mb-6 text-left space-y-2 flex-grow">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <button
        onClick={handleFreeTrial}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors lowercase"
      >
        continue with free account
      </button>
    </div>
  );
};

export default FreeCard;
