import { curry } from 'fp-tools';
import { ApiRequest } from 'types/core/api.type';
import { ReduxBaseAction } from 'types/core/baseAction.type';

// --[ constants ]-------------------------------------------------------------
export const API_REQUEST = 'API REQUEST';
export const API_SUCCESS = 'API SUCCESS';
export const API_ERROR = 'API ERROR';

// --[ actions ]---------------------------------------------------------------
export const apiRequest = (request: ApiRequest): ReduxBaseAction<any> => {
  const { body = null, method, url, feature } = request;
  return {
    type: `${feature} ${API_REQUEST} ${method}`,
    payload: { url, method, body },
    meta: { feature },
  };
};

export const apiSuccess = curry(
  (feature: string, method: string, payload: any): ReduxBaseAction<any> => {
    return {
      type: `${feature} ${API_SUCCESS} ${method}`,
      payload: payload,
      meta: { feature },
    };
  }
);

export const apiError = curry(
  (feature: string, method: string, error: any): ReduxBaseAction<any> => {
    return {
      type: `${feature} ${API_ERROR} ${method}`,
      payload: error,
      meta: { feature },
    };
  }
);
