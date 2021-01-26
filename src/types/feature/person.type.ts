import { Base } from './base.type';

export interface Person extends Base<Person> {
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

const defaultValues: Person = {
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

export const emptyPerson = (): Person => ({
  ...defaultValues,
  meta: defaultValues,
});
