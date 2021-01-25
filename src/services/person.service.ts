import { apiRequest } from 'redux/actions/api.actions';
import { PERSON_KEY } from 'redux/keys';
import { compose } from 'utilities/general.utils';
import { join, concat, defaultTo, map } from 'ramda';
import { Person } from 'types/feature/person.type';
import { ReduxBaseAction } from 'types/core/baseAction.type';
import { ApiRequest } from 'types/core/api.type';

type UrlArgs = (string | number | undefined)[];

const ENV_URL = 'https://swapi.dev/';
const generateURL: (args: UrlArgs) => string = compose(
  concat(ENV_URL),
  join('/'),
  map(defaultTo(''))
);
const PERSON_URL = ['api', 'people'];

export const createPerson = (person: Person) => {
  return apiRequest({
    body: person,
    method: 'POST',
    url: generateURL(PERSON_URL),
    feature: PERSON_KEY,
  });
};

export const readPerson = (id?: number): ReduxBaseAction<ApiRequest> => {
  return apiRequest({
    method: 'GET',
    url: generateURL([...PERSON_URL, id]),
    feature: PERSON_KEY,
  });
};

export const updatePerson = (id: number, person: Partial<Person>) => {
  return apiRequest({
    body: person,
    method: 'PATCH',
    url: generateURL([...PERSON_URL, id]),
    feature: PERSON_KEY,
  });
};

export const deletePerson = (id: number) => {
  return apiRequest({
    method: 'DELETE',
    url: generateURL([...PERSON_URL, id]),
    feature: PERSON_KEY,
  });
};
