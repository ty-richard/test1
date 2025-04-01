import { Travelogue } from '@/types/travelogue';
import Image from 'next/image';
import { dm_sans, roboto_serif } from '@/app/fonts';
import { formatDate } from '@/utils/helpers';

interface TravelogueCountryProps {
  travelogue: Travelogue;
}

const TravelogueCountry = ({ travelogue }: TravelogueCountryProps) => {
  const sortedTrips = [...travelogue.trips].sort(
    (a, b) => new Date(b.country.dateVisited).getTime() - new Date(a.country.dateVisited).getTime()
  );

  return (
    <div className="space-y-6">
      {sortedTrips.map((trip) => (
        <div key={trip.tripId} className="grid grid-cols-12 gap-6 border border-navy p-4 bg-light rounded-lg">
          <div className="col-span-8 overflow-hidden">
            <div className="p-4">
              <h3 className={`${dm_sans.className} text-3xl text-navy text-center font-extrabold lowercase`}>
                destination
              </h3>
            </div>
            <div className="aspect-video relative">
              <Image
                src={trip.country.countryImage}
                alt={trip.country.cityName}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="p-4 space-y-2 text-center">
              <h4 className={`${dm_sans.className} text-navy text-2xl font-semibold`}>
                {trip.country.cityName}
              </h4>
              <p className={`${dm_sans.className} text-navy text-md`}>
                {trip.country.cityRegion}
              </p>
              <p className={`${dm_sans.className} text-navy text-md`}>
                {trip.country.country}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex justify-center">
            <div className="w-px bg-navy h-full"></div>
          </div>
          <div className="col-span-3 p-4 space-y-1 flex flex-col justify-center">
            {(() => {
              const { month, day, year } = formatDate(trip.country.dateVisited);
              return (
                <>
                  <p className={`${dm_sans.className} text-navy uppercase text-2xl font-extrabold`}>
                    {month}
                  </p>
                  <p className={`${roboto_serif.className} text-navy text-2xl font-semibold`}>
                    {day}
                  </p>
                  <p className={`${roboto_serif.className} text-navy text-sm`}>
                    {year}
                  </p>
                </>
              );
            })()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelogueCountry;