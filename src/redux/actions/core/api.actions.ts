import { ApiRequest, ApiResponse, ReduxBaseAction } from 'types';

export const API_REQUEST = 'API REQUEST';
export const API_SUCCESS = 'API SUCCESS';
export const API_ERROR = 'API ERROR';

export const apiRequest = (request: ApiRequest): ReduxBaseAction<any> => {
  const { body, method, url, feature } = request;
  return {
    type: `${feature} ${API_REQUEST} ${method}`,
    payload: body,
    meta: { method, url, feature },
  };
};

export const apiSuccess = (response: ApiResponse): ReduxBaseAction<any> => {
  const { payload, feature } = response;
  return {
    type: `${feature} ${API_SUCCESS}`,
    payload: payload,
    meta: { feature },
  };
};

export const apiError = (response: ApiResponse): ReduxBaseAction<any> => {
  const { error, feature } = response;
  return {
    type: `${feature} ${API_SUCCESS}`,
    payload: error,
    meta: { feature },
  };
};
