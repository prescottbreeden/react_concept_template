import { ApiResponse } from 'types';

export const DATA_NORMALIZED = 'DATA_NORMALIZED';
export const SET_DATA = 'SET';

export const dataNormalized = ({ feature }: ApiResponse) => {
  return {
    type: `${feature} ${DATA_NORMALIZED}`,
    meta: { feature },
  };
};

export const setData = ({ payload, feature }: ApiResponse) => {
  return {
    type: `${feature} ${SET_DATA}`,
    payload: payload,
    meta: { feature },
  };
};
