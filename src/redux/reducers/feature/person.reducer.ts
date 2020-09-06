import { Person, emptyPerson } from 'types';
import { prop } from 'ramda';
import { PERSON_KEY } from 'redux/keys';
import { SET_DATA } from 'redux/actions/core/data.actions';

const initialState: Person[] = [emptyPerson()];

export const personReducer = (person = initialState, action: any) => {
  switch (action.type) {
    case `${PERSON_KEY} ${SET_DATA}`:
      return action.payload;

    default:
      return person;
  }
};

// -- Select From State --------------------------------------------------------
export const selectPersons = (state: any) => {
  return prop(PERSON_KEY, state);
};
