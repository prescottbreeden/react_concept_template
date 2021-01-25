import { PERSON_KEY } from 'redux/keys';
import { SET_DATA } from 'redux/actions/data.actions';
import { prop } from 'ramda';
import { Person } from 'types/feature/person.type';

// --[ reducer ]---------------------------------------------------------------
const initialState: Person[] = [];

export const personReducer = (person = initialState, action: any) => {
  switch (action.type) {
    case `${PERSON_KEY} ${SET_DATA}`:
      return action.payload;

    default:
      return person;
  }
};

// --[ selectors ]-------------------------------------------------------------
export const selectPersons = (state: any) => {
  return prop(PERSON_KEY, state);
};
