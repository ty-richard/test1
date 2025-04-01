import Image from 'next/image';
import Link from 'next/link';
import { dm_sans, inter } from '@/app/fonts';
import destinationsData from '@/data/destinations.json';

const HomeViewAllItem = () => {
  const cities = [
    "New York",
    "Paris",
    "Tokyo",
    "London",
    "Rome",
    "Barcelona",
    "Dubai",
    "Sydney"
  ];

  const firstDestination = destinationsData.destinations[0];

  return (
    <div className="flex flex-col md:flex-row w-full gap-4 sm:gap-8 p-4 sm:p-6 mt-4">
      <div className="w-full md:w-[60%]">
        <Image
          src="/static/images/stockMallorca.jpg"
          alt="Top destinations"
          width={1000}
          height={600}
          className="w-full h-[300px] sm:h-auto rounded-lg object-cover"
        />
      </div>
      
      <div className="w-full md:w-[30%] flex flex-col items-center md:items-start md:pl-4 mt-6 md:mt-0">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center md:text-left ${dm_sans.className}`}>
          top<br />destinations
        </h2>
        
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-center md:text-left w-full">
          {cities.map((city, index) => (
            <li key={index} className="text-sm text-gray-700">{city}</li>
          ))}
        </ul>
        
        <Link 
          href={{
            pathname: '/destinations',
            query: { id: firstDestination.id }
          }}
        >
          <button className={`px-8 py-3 bg-navy text-white text-sm rounded-lg hover:bg-gray-800 transition-colors ${inter.className}`}>
            VIEW ALL
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeViewAllItem;
