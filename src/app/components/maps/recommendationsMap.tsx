import React, { useMemo, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { roboto_serif, dm_sans, inter } from "@/app/fonts";
import { getPriceSymbols } from '../../../utils/helpers';
import { RecommendationsMapProps } from '@/types/maps';

const RecommendationsMap: React.FC<RecommendationsMapProps> = ({ mapCenter, markers }) => {
  const [selectedMarker, setSelectedMarker] = useState<typeof markers[0] | null>(null);

  const markerIcon = useMemo(() => ({
    path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
    fillColor: '#121E5B',
    fillOpacity: 1,
    strokeColor: '#121E5B',
    strokeWeight: 1,
  }), []);

  return (
    <div className="w-full h-[400px] mb-4">
      <GoogleMap 
        zoom={13} 
        center={mapCenter} 
        mapContainerClassName="w-full h-full rounded-lg shadow-lg"
      >
        {markers.map((marker) => (
          <Marker 
            key={marker.id}
            position={marker.position}
            icon={markerIcon}
            title={marker.name}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2 sm:p-4 max-w-md text-navy">
              <h3 className={`text-xl mb-2 lowercase ${roboto_serif.className}`}>{selectedMarker.locationType}</h3>
              <h2 className={`text-2xl font-semibold lowercase ${dm_sans.className}`}>
                {selectedMarker.name}
              </h2>
              <p className={`text-navy mt-2 ${inter.className}`}>
                {selectedMarker.cityName} {selectedMarker.price && `| ${getPriceSymbols(selectedMarker.price + 1)}`}
              </p>
              {selectedMarker.keywords && (
                <div className="mt-2 text-md italic">{selectedMarker.keywords}</div>
              )}
              {selectedMarker.image && (
                <div className="relative h-48 mt-4">
                  <img 
                    src={selectedMarker.image} 
                    alt={selectedMarker.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default RecommendationsMap; 