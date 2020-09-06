import { Meta } from 'types';

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
}

export const emptyPerson = (): Person => {
  return {
    personId: -1,
    height: '',
    name: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
    homeworld: '',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
  };
};
