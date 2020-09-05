import {ApiAction} from "types";
import {API_REQUEST, apiSuccess, apiError} from "../actions/api.actions";

export const apiMiddleware = ({dispatch}: any) => (next: Function) => (action: ApiAction) => {
  next(action);

  if (action.type.includes(API_REQUEST)) {
    const { url, method, feature } = action.meta;

    url && fetch(url, { method })
      .then((response: any) => response.json())
      .then((payload: any) => dispatch(apiSuccess({payload, feature})))
      .catch((error: any) => dispatch(apiError({ error, feature })));
  }
};
