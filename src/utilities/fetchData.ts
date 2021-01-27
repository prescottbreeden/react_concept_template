import { ApiOptions } from 'types/core/api.type';

export const makeRequest = ({ url, method, body }: ApiOptions) => {
  return fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });
};
