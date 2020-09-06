import { ReduxBaseAction, LoaderAction } from 'types';
import { LOADING_KEY } from 'redux/keys';

export const SET_LOADER = `${LOADING_KEY} STARTED`;
export const REMOVE_LOADER = `${LOADING_KEY} ENDING`;

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
