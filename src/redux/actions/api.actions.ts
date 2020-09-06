import { ApiRequest, ApiResponse, ReduxBaseAction } from 'types';

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
    type: `${feature} ${API_SUCCESS} ${method}`,
    payload: error,
    meta: { feature },
  };
};
