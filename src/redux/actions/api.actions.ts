import { ApiRequest, ApiResponse } from 'types/core/api.type';
import { ReduxBaseAction } from 'types/core/baseAction.type';

export const API_REQUEST = 'API REQUEST';
export const API_SUCCESS = 'API SUCCESS';
export const API_ERROR = 'API ERROR';

export const apiRequest = (request: ApiRequest): ReduxBaseAction<any> => {
  const { body, method, url, feature } = request;
  return {
    type: `${feature} ${API_REQUEST} ${method}`,
    payload: { url, method, body },
    meta: { feature },
  };
};

export const apiSuccess = (response: ApiResponse): ReduxBaseAction<any> => {
  const { payload, feature, method } = response;
  return {
    type: `${feature} ${API_SUCCESS} ${method}`,
    payload: payload,
    meta: { feature },
  };
};

export const apiError = (response: ApiResponse): ReduxBaseAction<any> => {
  const { error, feature, method } = response;
  return {
    type: `${feature} ${API_ERROR} ${method}`,
    payload: error,
    meta: { feature },
  };
};
