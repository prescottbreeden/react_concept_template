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

// export const makeRequest = (options: ApiOptions) =>
//   new Task((reject: any, resolve: any) => {
//   const { url, method, body: bod } = options;
//   const body = bod ? JSON.stringify(bod) : null;
//   fetch(url, { method, headers: { Accept: 'application/json' }, body })
//     .then(json)
//     .then(handleSwapiNesting)
//     .then(resolve)
//     .catch(reject);
// });
