export const SET_LOADER = 'LOADING';

export const setLoader = ({ payload, feature }: any) => {
  return {
    type: SET_LOADER,
    payload: payload,
    meta: { feature },
  };
};
