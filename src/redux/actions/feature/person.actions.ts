import { Person } from 'types';
import { apiRequest } from 'redux/actions/core/api.actions';

export const PERSON = '[PERSON]';
export const SET_PERSON = `${PERSON} SET`;

const PERSON_URL = 'https://swapi.dev/api/people/';

export const createPerson = (person: Person) => {
  return apiRequest({
    body: person,
    method: 'POST',
    url: `${PERSON_URL}`,
    feature: PERSON,
  });
};

export const readPerson = (id?: number) => {
  return apiRequest({
    body: null,
    method: 'GET',
    url: `${PERSON_URL}${id ? id : ''}`,
    feature: PERSON,
  });
};

export const updatePerson = (id: number, person: Partial<Person>) => {
  return apiRequest({
    body: person,
    method: 'PATCH',
    url: `${PERSON_URL}${id}`,
    feature: PERSON,
  });
};

export const deletePerson = (id: number) => {
  return apiRequest({
    body: null,
    method: 'DELETE',
    url: `${PERSON_URL}${id}`,
    feature: PERSON,
  });
};

export const setPerson = ({ data, feature }: any) => {
  return {
    type: SET_PERSON,
    payload: data,
    meta: { feature },
  };
};
