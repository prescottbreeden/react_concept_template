import { PERSON_KEY } from 'redux/keys';
import { API_SUCCESS, apiRequest } from 'redux/actions/core/api.actions';
import { setData } from 'redux/actions/core/data.actions';
import { readPerson } from 'redux/actions/feature/person.actions';

export const personMiddleware = () => (next: Function) => (action: any) => {
  next(action);

  const { param, body } = action.payload;

  switch (action.type) {
    case `${PERSON_KEY} CREATE`:
      next(apiRequest({ body, method: 'POST', feature: PERSON_KEY }));
      break;

    case `${PERSON_KEY} READ`:
      next(apiRequest({ body, method: 'GET', param, feature: PERSON_KEY }));
      break;

    case `${PERSON_KEY} UPDATE`:
      next(apiRequest({ body, method: 'PUT', param, feature: PERSON_KEY }));
      break;

    case `${PERSON_KEY} DETLETE`:
      next(apiRequest({ body, method: 'DELETE', param, feature: PERSON_KEY }));
      break;

    case `${PERSON_KEY} ${API_SUCCESS} GET`:
      next(setData({ payload: action.payload, feature: PERSON_KEY }));
      break;

    case `${PERSON_KEY} ${API_SUCCESS} CREATE`:
    case `${PERSON_KEY} ${API_SUCCESS} UPDATE`:
      console.log('reload');
      next(readPerson());
      break;
  }
};
