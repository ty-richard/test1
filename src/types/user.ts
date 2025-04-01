interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  homeAirport: string;
  premiumUser: boolean;
  bookmarkedDestinations: number[];
  checkedDestinations: number[];
  signedUp: boolean;
  signedIn: boolean;
  creditCardNumber: string;
  creditCardExpiration: string;
  creditCardCVC: string;
  recentTrip: string;
  countriesVisited: number;
  tripsSaved: number;
}

export default User;
