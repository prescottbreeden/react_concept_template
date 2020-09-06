import { Person, emptyPerson } from 'types';
import { SET_PERSON } from 'redux/actions/feature/person.actions';
import { prop } from 'ramda';
import { PERSON_KEY } from 'redux/keys';

const initialState: Person[] = [emptyPerson()];

export const personReducer = (person = initialState, action: any) => {
  switch (action.type) {
    case SET_PERSON:
      return action.payload;

    default:
      return person;
  }
};

// -- Select From State --------------------------------------------------------
export const selectPersons = (state: any) => {
  return prop(PERSON_KEY, state);
};
