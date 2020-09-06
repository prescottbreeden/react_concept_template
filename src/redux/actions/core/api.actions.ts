import { ApiRequest, ApiResponse, ApiAction } from 'types';

export const API_REQUEST = '[API REQUEST]';
export const API_SUCCESS = '[API SUCCESS]';
export const API_ERROR = '[API ERROR]';

export const apiRequest = (request: ApiRequest): ApiAction => {
  const { body, method, url, feature } = request;
  return {
    type: `${feature} ${API_REQUEST}`,
    payload: body,
    meta: { method, url, feature },
  };
};

export const apiSuccess = (response: ApiResponse): ApiAction => {
  const { payload, feature } = response;
  return {
    type: `${feature} ${API_SUCCESS}`,
    payload: payload,
    meta: { feature },
  };
};

export const apiError = (response: ApiResponse): ApiAction => {
  const { error, feature } = response;
  return {
    type: `${feature} ${API_SUCCESS}`,
    payload: error,
    meta: { feature },
  };
};
