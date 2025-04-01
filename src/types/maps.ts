export interface HomeMapProps {
  selectedPlace?: google.maps.places.PlaceResult | null;
}

export interface RecommendationsMapProps {
  mapCenter: { lat: number; lng: number };
  markers: Array<{ 
    id: string; 
    position: { lat: number; lng: number }; 
    name: string;
    cityName: string;
    price?: number;
    keywords?: string;
    image: string;
    bookmarked?: boolean;
    checked?: boolean;
  }>;
}
