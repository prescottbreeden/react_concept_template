import { ApiAction } from 'types';
import { API_SUCCESS } from 'redux/actions/core/api.actions';
import { setData } from 'redux/actions/core/data.actions';

export const dataMiddleware = () => (next: Function) => (action: ApiAction) => {
  next(action);

  if (action.type.includes(API_SUCCESS)) {
    const { payload, meta } = action;
    next(
      setData({
        payload: payload.results,
        feature: meta.feature,
      })
    );
  }
};
