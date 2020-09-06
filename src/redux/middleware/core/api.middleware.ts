import { ApiOptions, ReduxBaseAction } from 'types';
import {
  API_REQUEST,
  API_ERROR,
  apiSuccess,
  apiError,
} from 'redux/actions/api.actions';
import { setLoader, removeLoader } from 'redux/actions/loader.actions';
import { setNotification } from 'redux/actions/notification.actions';
import { makeRequest } from 'utils/fetchData';

export const apiMiddleware = ({ dispatch }: any) => (next: Function) => (
  action: ReduxBaseAction<ApiOptions>
) => {
  next(action);

  if (action.type.includes(API_REQUEST)) {
    const { feature } = action.meta;
    const { method } = action.payload;

    const loaderId = new Date().getMilliseconds();
    dispatch(setLoader({ id: loaderId, feature }));
    makeRequest(action.payload)
      .then((response: Response) => response.json())
      .then((payload: any) =>
        dispatch(apiSuccess({ payload, feature, method }))
      )
      .catch((error: any) => dispatch(apiError({ error, feature, method })))
      .finally(() =>
        setTimeout(() => {
          // demonstration purpose timeout only
          dispatch(removeLoader({ id: loaderId, feature }));
        }, 2000)
      );
  }

  if (action.type.includes(API_ERROR)) {
    next(setNotification({ message: 'An error occurred', status: 'error' }));
  }
};
