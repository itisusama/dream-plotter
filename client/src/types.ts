export interface Character {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
}

export interface Location {
  id: number;
  country: string;
  address: string;
}

export interface Family {
  id: string;
  name: string;
  characters: Character[];
  locations: Location[];
}