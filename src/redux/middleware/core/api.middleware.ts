import { ApiAction } from 'types';
import {
  API_REQUEST,
  API_ERROR,
  apiSuccess,
  apiError,
} from 'redux/actions/core/api.actions';
import { setLoader, removeLoader } from 'redux/actions/core/loader.actions';
import { setNotification } from 'redux/actions/core/notification.actions';

export const apiMiddleware = ({ dispatch }: any) => (next: Function) => (
  action: ApiAction
) => {
  next(action);

  if (action.type.includes(API_REQUEST)) {
    const { url, method, feature } = action.meta;

    const loaderId = new Date().getMilliseconds();
    dispatch(setLoader({ id: loaderId, feature }));
    fetch(url, { method })
      .then((response: Response) => response.json())
      .then((payload: any) =>
        dispatch(apiSuccess({ payload, feature, method }))
      )
      .catch((error: any) => dispatch(apiError({ error, feature, method })))
      .finally(() =>
        setTimeout(() => {
          // demonstration purpose timeout only
          dispatch(removeLoader({ id: loaderId, feature }));
        }, 0)
      );
  }

  if (action.type.includes(API_ERROR)) {
    next(
      setNotification({
        payload: action.payload,
        message: 'dingo',
        status: 'error',
      })
    );
  }
};
