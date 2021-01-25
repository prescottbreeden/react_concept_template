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
import { prop } from 'utilities/general.utils';

export const apiMiddleware = ({ dispatch }: any) => (next: Function) => (
  action: ReduxBaseAction<ApiOptions>
) => {
  next(action);

  if (action.type.includes(API_REQUEST)) {
    const {
      meta: { feature },
      payload: { method },
    } = action;
    const id = new Date().getMilliseconds();

    dispatch(setLoader({ id, feature }));
    makeRequest(action.payload)
      .then((res: Response) => res.json())
      .then(prop('results'))
      .then((response: any) => dispatch(apiSuccess(feature, method, response)))
      .catch((error: any) => dispatch(apiError(feature, method, error)))
      .finally(() => dispatch(removeLoader({ id, feature })));
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
