import {
  API_REQUEST,
  API_ERROR,
  apiSuccess,
  apiError,
} from 'redux/actions/api.actions';
import { setLoader, removeLoader } from 'redux/reducers/core/loader.reducer';
import { setNotification } from 'redux/reducers/core/notifications.reducer';
import { ApiOptions } from 'types/core/api.type';
import { ReduxBaseAction } from 'types/core/baseAction.type';
import { makeRequest } from 'utilities/fetchData';

const handleSWAPIcrap = (payload: any) => {
  return 'results' in payload ? payload.results : payload;
};

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
      .then((payload) => handleSWAPIcrap(payload))
      .then((payload) => dispatch(apiSuccess({ payload, feature, method })))
      .catch((error: any) => dispatch(apiError({ error, feature, method })))
      .finally(() =>
        setTimeout(() => {
          // for testing purposes
          dispatch(removeLoader({ id: loaderId, feature }));
        }, 2000)
      );
  }

  if (action.type.includes(API_ERROR)) {
    next(
      setNotification({
        message: action.payload.toString(),
        status: 'error',
      })
    );
  }
};
