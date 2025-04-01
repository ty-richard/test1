import Image from 'next/image';
import Link from 'next/link';
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
    <div className="flex flex-col md:flex-row w-full gap-8 p-6 mt-4">
      <div className="w-full md:w-[60%]">
        <Image
          src="/static/images/stockMallorca.jpg"
          alt="Top destinations"
          width={1000}
          height={600}
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
      
      <div className="w-full md:w-[30%] flex flex-col items-center md:items-start md:pl-4">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left">
          top<br />destinations
        </h2>
        
        <ul className="space-y-3 mb-8 text-center md:text-left w-full">
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
          <button className="px-8 py-3 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors">
            VIEW ALL
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeViewAllItem;
