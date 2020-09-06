import { PERSON_KEY } from 'redux/keys';
import { Person } from 'types';

export const createPerson = (person: Person) => {
  return {
    type: `${PERSON_KEY} CREATE`,
    payload: {
      body: person,
    },
  };
};

export const readPerson = (id?: number) => {
  return {
    type: `${PERSON_KEY} READ`,
    payload: {
      body: null,
      param: `${id ? id : ''}`,
    },
  };
};

export const updatePerson = (id: number, person: Partial<Person>) => {
  return {
    type: `${PERSON_KEY} UPDATE`,
    payload: {
      body: person,
      param: `${id}`,
    },
  };
};

export const deletePerson = (id: number) => {
  return {
    type: `${PERSON_KEY} UPDATE`,
    payload: {
      param: `${id}`,
    },
  };
};
