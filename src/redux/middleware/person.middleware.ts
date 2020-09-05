import {ApiAction} from "../../types/types";
import {FETCH_PERSON, PERSON, setPerson} from "../actions/person.actions";
import {apiRequest, API_SUCCESS, API_ERROR} from "../actions/api.actions";

const PERSON_URL = 'api/person';

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

    case `${API_SUCCESS} ${PERSON}`:
      next(setPerson({ personData: action.payload }));
      break;

    case `${API_ERROR} ${PERSON}`:
      // next(setNotification(action.payload));
      break;
  }
}
