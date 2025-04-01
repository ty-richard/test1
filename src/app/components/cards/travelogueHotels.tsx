import { Travelogue } from '@/types/travelogue';
import { dm_sans, roboto_serif } from '@/app/fonts';
import { BookmarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid, CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';
import { renderStarRating, formatDate } from '@/utils/helpers';
import Image from 'next/image';

interface TravelogueHotelsProps {
  travelogue: Travelogue;
}

const TravelogueHotels = ({ travelogue }: TravelogueHotelsProps) => {
  const allHotels = travelogue.trips
    .flatMap((trip) => trip.country.hotels)
    .sort((a, b) => new Date(b.dateStayed).getTime() - new Date(a.dateStayed).getTime());

  return (
    <div className="space-y-6">
      {allHotels.map((hotel, index) => (
        <div key={index} className="grid grid-cols-12 gap-6 border border-navy p-4 bg-light rounded-lg">
          <div className="col-span-8 overflow-hidden">
            <div className="p-4 flex justify-between items-center">
              <h3 className={`${dm_sans.className} text-2xl text-navy font-extrabold lowercase`}>
                hotel
              </h3>
              <div className="flex gap-2">
                <button className="text-navy hover:text-navy/70 transition-colors">
                  {hotel.hotelBookmarked ? (
                    <BookmarkIconSolid className="h-6 w-6" />
                  ) : (
                    <BookmarkIcon className="h-6 w-6" />
                  )}
                </button>
                <button className="text-navy hover:text-navy/70 transition-colors">
                  {hotel.hotelChecked ? (
                    <CheckCircleSolid className="h-6 w-6" />
                  ) : (
                    <CheckCircleIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
            <div className="aspect-video relative">
              <Image
                src={hotel.image || '/static/images/default-hotel.jpg'}
                alt={hotel.hotelName}
                className="object-cover rounded-lg"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-4 space-y-2">
              <h4 className={`${dm_sans.className} text-navy font-semibold`}>
                {hotel.hotelName}
              </h4>
              <div className="flex items-center gap-2">
                {renderStarRating(hotel.rating || 0)}
                <span className="text-navy">{hotel.rating}/5</span>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex justify-center">
            <div className="w-px bg-navy h-full"></div>
          </div>
          <div className="col-span-3 p-4 space-y-1 flex flex-col justify-center">
            {(() => {
              const { month, day, year } = formatDate(hotel.dateStayed);
              return (
                <>
                  <p className={`${dm_sans.className} text-navy uppercase text-2xl font-extrabold`}>
                    {month}
                  </p>
                  <p className={`${roboto_serif.className} text-navy text-2xl font-semibold`}>
                    {day}
                  </p>
                  <p className={`${roboto_serif.className} text-navy text-lg`}>
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

export default TravelogueHotels;