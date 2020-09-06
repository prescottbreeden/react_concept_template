import { ApiAction } from 'types';
import { PERSON, setPerson } from 'redux/actions/feature/person.actions';
import { API_SUCCESS } from 'redux/actions/core/api.actions';

export const personMiddleware = () => (next: Function) => (
  action: ApiAction
) => {
  next(action);

  switch (action.type) {
    case `${PERSON} ${API_SUCCESS}`:
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
