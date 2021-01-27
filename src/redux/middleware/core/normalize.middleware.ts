import { dataNormalized, SET_DATA } from 'redux/actions/core/data.actions';
import { mergeDeepRight } from 'ramda';
import { ReduxBaseAction } from 'types/core/baseAction.type';
import { ApiResponse } from 'types/core/api.type';
import { normalizeArray, normalizeDatum } from 'utilities/general.utils';

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
