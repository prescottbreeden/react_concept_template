export const SET_LOADER = 'LOADING STARTED';
export const REMOVE_LOADER = 'LOADING ENDING';

export const setLoader = ({ id, feature }: any) => {
  return {
    type: `${SET_LOADER} ${feature}`,
    payload: { id },
    meta: { feature },
  };
};

export const removeLoader = ({ id, feature }: any) => {
  return {
    type: `${REMOVE_LOADER} ${feature}`,
    payload: { id, feature },
  };
};
