import {Person} from "../../types/types";
import {SET_PERSON} from "../actions/person.actions";

const initialState: Person[] = [];

export const personReducer = (person = initialState, action: any) => {
  switch(action.type) {
    case SET_PERSON:
      return action.payload;

    default:
      return person;
  }
}
