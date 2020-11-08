export const DATA_NORMALIZED = 'DATA_NORMALIZED';
export const SET_DATA = 'SET_DATA';

export const dataNormalized = ({ feature }: any) => {
  return {
    type: `${feature} ${DATA_NORMALIZED}`,
    meta: { feature },
  };
};

export const setData = ({ payload, feature }: any) => {
  return {
    type: `${feature} ${SET_DATA}`,
    payload,
    meta: { feature },
  };
};
