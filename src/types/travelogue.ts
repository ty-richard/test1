interface Hotel {
  hotelName: string;
  hotelBookmarked: boolean;
  hotelChecked: boolean;
  dateStayed: string;
  image: string;
  rating: number;
}

interface Country {
  countryImage: string;
  cityName: string;
  cityRegion: string;
  country: string;
  dateVisited: string;
  hotels: Hotel[];
}

interface Trip {
  tripId: number;
  country: Country;
}

interface Travelogue {
  trips: Trip[];
}

export type { Travelogue, Trip, Country, Hotel };