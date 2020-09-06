import {Meta} from "types/base.type";

export interface Person extends Meta<Person> {
  personId: number;
  height: string;
  name: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
};

export const emptyPerson = (): Person => {
  return {
    personId: -1,
    height: '',
    name: 'Bob Ross',
    hair_color: 'brown',
    skin_color: 'white',
    eye_color: 'hazel',
    birth_year: '1952',
    gender: 'male',
    homeworld: '',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
  };
};
