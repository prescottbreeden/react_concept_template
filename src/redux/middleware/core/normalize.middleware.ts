import { ApiAction } from 'types';
import { dataNormalized } from 'redux/actions/core/data.actions';
import { normalizeArray, normalizeDatum } from 'utilities';
import { mergeDeepRight } from 'ramda';

export const normalizeMiddleware = ({ dispatch }: any) => (next: Function) => (
  action: ApiAction
) => {
  if (action.type.includes('SET')) {
    const payload = Array.isArray(action.payload)
      ? normalizeArray(action.payload)
      : [normalizeDatum(action.payload)];
    next(mergeDeepRight(action, { payload }));
    dispatch(dataNormalized({ feature: action.meta.feature }));
  } else {
    next(action);
  }
};
