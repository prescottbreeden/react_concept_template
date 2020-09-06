import {ApiAction} from "types";
import {FETCH_PERSON, PERSON, setPerson} from "../actions/person.actions";
import {apiRequest, API_SUCCESS } from "../actions/api.actions";

const PERSON_URL = 'https://swapi.dev/api/people/';

export const personMiddleware = () => (next: Function) => (action: ApiAction) => {
  next(action);

  switch(action.type) {

    case FETCH_PERSON:
      next(apiRequest({
        body: null,
        method: 'GET',
        url: PERSON_URL,
        feature: PERSON,
      }));
      break;

    case `${PERSON} ${API_SUCCESS}`:
      const { payload, meta } = action;
      next(setPerson({
        data: payload.results,
        feature: meta.feature 
      }));
      break;

  }
}
