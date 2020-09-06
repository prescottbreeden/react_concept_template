import {ApiAction} from "types";
import {API_REQUEST, apiSuccess, apiError, API_ERROR} from "../actions/api.actions";
import {setLoader} from "redux/actions/loader.actions";
import {setNotification} from "redux/actions/notification.actions";

export const apiMiddleware = ({dispatch}: any) => (next: Function) => (action: ApiAction) => {
  next(action);

  if (action.type.includes(API_REQUEST)) {
    const { url, method, feature } = action.meta;

    dispatch(setLoader({ payload: true, feature }))
    url && fetch(url, { method })
      .then((response: any) => response.json())
      .then((payload: any) => dispatch(apiSuccess({payload, feature})))
      .catch((error: any) => dispatch(apiError({ error, feature })))
      .finally(() => dispatch(setLoader({ payload: false, feature })));
  }

  if (action.type.includes(API_ERROR)) {
    next(setNotification({ message: 'An error occurred', status: 'error' }));
  }
};
