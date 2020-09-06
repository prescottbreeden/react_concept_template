import { ReduxBaseAction } from 'types';
import { setPerson, readPerson } from 'redux/actions/feature/person.actions';
import { API_SUCCESS } from 'redux/actions/core/api.actions';
import { PERSON_KEY } from 'redux/keys';

export const personMiddleware = () => (next: Function) => (
  action: ReduxBaseAction<any>
) => {
  next(action);

  const { payload, meta } = action;
  switch (action.type) {
    case `${PERSON_KEY} ${API_SUCCESS} GET`:
      next(
        setPerson({
          data: payload.results,
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
