import { Person, ApiRequest, ReduxBaseAction } from 'types';
import { apiRequest } from 'redux/actions/api.actions';
import { PERSON_KEY } from 'redux/keys';
import { compose } from 'utils/utilities';
import { join, concat, defaultTo, map } from 'ramda';

const ENV_URL = 'https://swapi.dev/';

const generateURL = compose(concat(ENV_URL), join('/'), map(defaultTo('')));

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
    body: null,
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
    body: null,
    method: 'DELETE',
    url: generateURL([...PERSON_URL, id]),
    feature: PERSON_KEY,
  });
};
