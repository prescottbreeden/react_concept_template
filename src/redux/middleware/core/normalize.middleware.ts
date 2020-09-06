import { ReduxBaseAction, ApiResponse } from 'types';
import { dataNormalized, SET_DATA } from 'redux/actions/data.actions';
import { normalizeArray, normalizeDatum } from 'utils/utilities';
import { mergeDeepRight } from 'ramda';

export const normalizeMiddleware = ({ dispatch }: any) => (next: Function) => (
  action: ReduxBaseAction<ApiResponse>
) => {
  if (action.type.includes(SET_DATA)) {
    const payload = Array.isArray(action.payload)
      ? normalizeArray(action.payload)
      : [normalizeDatum(action.payload)];
    next(mergeDeepRight(action, { payload }));
    dispatch(dataNormalized({ feature: action.meta.feature }));
  } else {
    next(action);
  }
};
