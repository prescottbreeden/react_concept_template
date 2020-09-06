import { Person, ApiRequest, ReduxBaseAction } from 'types';
import { apiRequest } from 'redux/actions/api.actions';
import { PERSON_KEY } from 'redux/keys';

const PERSON_URL = 'https://swapi.dev/api/people/';

export const createPerson = (person: Person) => {
  return apiRequest({
    body: person,
    method: 'POST',
    url: `${PERSON_URL}`,
    feature: PERSON_KEY,
  });
};

export const readPerson = (id?: number): ReduxBaseAction<ApiRequest> => {
  return apiRequest({
    body: null,
    method: 'GET',
    url: `${PERSON_URL}${id ? id : ''}`,
    feature: PERSON_KEY,
  });
};

export const updatePerson = (id: number, person: Partial<Person>) => {
  return apiRequest({
    body: person,
    method: 'PATCH',
    url: `${PERSON_URL}${id}`,
    feature: PERSON_KEY,
  });
};

export const deletePerson = (id: number) => {
  return apiRequest({
    body: null,
    method: 'DELETE',
    url: `${PERSON_URL}${id}`,
    feature: PERSON_KEY,
  });
};