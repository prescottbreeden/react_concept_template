import { Person, emptyPerson } from 'types';
import { SET_PERSON } from 'redux/actions/feature/person.actions';

const initialState: Person[] = [emptyPerson()];

export const personReducer = (person = initialState, action: any) => {
  switch (action.type) {
    case SET_PERSON:
      return action.payload;

    default:
      return person;
  }
};
