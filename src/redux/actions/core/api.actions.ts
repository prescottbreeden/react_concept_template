import { ApiRequest, ApiResponse, ReduxBaseAction } from 'types';
import { prop } from 'ramda';
import services from 'services';

export const API_REQUEST = 'API REQUEST';
export const API_SUCCESS = 'API SUCCESS';
export const API_ERROR = 'API ERROR';

export const apiRequest = (request: ApiRequest) => {
  const { body = null, param, method, feature } = request;
  const service = prop(feature, services);
  const url = `${service}${param}`;
  return {
    type: `${feature} ${API_REQUEST} ${method}`,
    payload: body,
    meta: { method, url, feature },
  };
};

export const apiSuccess = (response: ApiResponse): ReduxBaseAction<any> => {
  const { payload, feature, method } = response;
  return {
    type: `${feature} ${API_SUCCESS} ${method}`,
    payload: payload,
    meta: { feature, method },
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
