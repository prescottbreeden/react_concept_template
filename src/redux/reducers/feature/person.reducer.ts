import { PERSON_KEY } from 'redux/keys';
import { SET_DATA } from 'redux/actions/data.actions';
import { prop } from 'fp-tools';
import { Person } from 'types/feature/person.type';
import { ReduxBaseAction } from 'types/core/baseAction.type';

// --[ reducer ]---------------------------------------------------------------
const initialState: Person[] = [];

export const personReducer = (
  person = initialState,
  { payload, type }: ReduxBaseAction<Person[]>
) => {
  switch (type) {
    case `${PERSON_KEY} ${SET_DATA}`:
      return payload;

    default:
      return person;
  }
};

// --[ selectors ]-------------------------------------------------------------
export const selectPersons = (state: any) => {
  return prop(PERSON_KEY, state);
};
