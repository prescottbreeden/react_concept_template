import {ApiAction} from "types";
import {FETCH_PERSON, PERSON, setPerson} from "../actions/person.actions";
import {apiRequest, API_SUCCESS, API_ERROR} from "../actions/api.actions";
import {setNotification} from "redux/actions/notification.actions";

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
      next(setPerson({ personData: action.payload.results }));
      break;

    case `${PERSON} ${API_ERROR}`:
      next(setNotification({ 
        message: 'An error occurred', 
        feature: PERSON,
        status: 'error',
      }));
      break;
  }
}
