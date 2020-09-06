import { ApiAction } from 'types';
import {
  API_REQUEST,
  apiSuccess,
  apiError,
  API_ERROR,
} from '../../actions/core/api.actions';
import { setLoader, removeLoader } from 'redux/actions/core/loader.actions';
import { setNotification } from 'redux/actions/core/notification.actions';

export const apiMiddleware = ({ dispatch }: any) => (next: Function) => (
  action: ApiAction
) => {
  next(action);

  if (action.type.includes(API_REQUEST)) {
    const { url, method, feature } = action.meta;

    if (url) {
      const loaderId = new Date().getMilliseconds();
      dispatch(setLoader({ id: loaderId, feature }));
      fetch(url, { method })
        .then((response: any) => response.json())
        .then((payload: any) => dispatch(apiSuccess({ payload, feature })))
        .catch((error: any) => dispatch(apiError({ error, feature })))
        .finally(() =>
          setTimeout(() => {
            // demonstration purpose timeout only
            dispatch(removeLoader({ id: loaderId, feature }));
          }, 2000)
        );
    }
  }

  if (action.type.includes(API_ERROR)) {
    next(setNotification({ message: 'An error occurred', status: 'error' }));
  }
};
