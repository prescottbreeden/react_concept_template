import { ApiAction } from 'types';
import { setPerson } from 'redux/actions/feature/person.actions';
import { API_SUCCESS } from 'redux/actions/core/api.actions';
import { PERSON_KEY } from 'redux/keys';

export const personMiddleware = () => (next: Function) => (
  action: ApiAction
) => {
  next(action);

  switch (action.type) {
    case `${PERSON_KEY} ${API_SUCCESS}`:
      const { payload, meta } = action;
      next(
        setPerson({
          data: payload.results,
          feature: meta.feature,
        })
      );
      break;
  }
};
