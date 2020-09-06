import { ReduxBaseAction } from 'types';
import { readPerson } from 'services/person.service';
import { API_SUCCESS } from 'redux/actions/api.actions';
import { PERSON_KEY } from 'redux/keys';
import { setData } from 'redux/actions/data.actions';

export const personMiddleware = () => (next: Function) => (
  action: ReduxBaseAction<any>
) => {
  next(action);

  const { payload, meta } = action;
  switch (action.type) {
    case `${PERSON_KEY} ${API_SUCCESS} GET`:
      next(
        setData({
          payload: payload.results,
          feature: meta.feature,
        })
      );
      break;

    case `${PERSON_KEY} ${API_SUCCESS} POST`:
    case `${PERSON_KEY} ${API_SUCCESS} PUT`:
      next(readPerson());
      break;
  }
};
