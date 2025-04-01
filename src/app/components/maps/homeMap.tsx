import { GoogleMap, useLoadScript, Marker, Libraries } from "@react-google-maps/api";
import { useMemo } from 'react';
import { HomeMapProps } from '@/types/maps';
import { useSearchParams } from 'next/navigation';

const HomeMap = ({ selectedPlace }: HomeMapProps) => {
  const libraries: Libraries = ['places'];
  const searchParams = useSearchParams();
  
  const markerIcon = useMemo(() => ({
    path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
    fillColor: '#121E5B',
    fillOpacity: 1,
    strokeColor: '#121E5B',
    strokeWeight: 1,
  }), []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
  });

  const Map = () => {
    const center = useMemo(() => {
      // First check URL parameters (from navbar search)
      const lat = searchParams.get('lat');
      const lng = searchParams.get('lng');
      if (lat && lng) {
        return {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        };
      }
      
      // Then check selectedPlace (from homeToggleItem search)
      if (selectedPlace?.geometry?.location) {
        return {
          lat: selectedPlace.geometry.location.lat(),
          lng: selectedPlace.geometry.location.lng(),
        };
      }
      
      //TODO Default center set to Los Angeles. Need to change this to the user's location.
      return { lat: 34.0549, lng: -118.2426 };
    }, []);
   
    return (
      <div className="w-full h-full">
        <GoogleMap 
          zoom={13} 
          center={center} 
          mapContainerClassName="w-full h-full rounded-lg shadow-lg"
        >
          {(selectedPlace?.geometry?.location || (searchParams.get('lat') && searchParams.get('lng'))) && (
            <Marker 
              position={center}
              icon={markerIcon}
            />
          )}
        </GoogleMap>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-[400px] sm:h-[500px] md:h-[600px] flex flex-col items-center justify-center -ml-[max(0px,calc((100vw-100%)/2))] mt-80 sm:mt-40 px-4 sm:px-8">
      {!isLoaded ? (
        <div className="text-lg text-gray-600">Loading...</div>
      ) : (
        <div className="w-full h-[350px] sm:h-[450px] md:h-[550px]">
          <Map />
        </div>
      )}
    </div>
  );
}

export default HomeMap
