import { ReduxBaseAction, LoaderAction } from 'types';

export const SET_LOADER = 'LOADING STARTED';
export const REMOVE_LOADER = 'LOADING ENDING';

export const setLoader = ({
  id,
  feature,
}: LoaderAction): ReduxBaseAction<LoaderAction> => {
  return {
    type: `${SET_LOADER} ${feature}`,
    payload: { id, feature },
  };
};

export const removeLoader = ({
  id,
  feature,
}: LoaderAction): ReduxBaseAction<LoaderAction> => {
  return {
    type: `${REMOVE_LOADER} ${feature}`,
    payload: { id, feature },
  };
};
