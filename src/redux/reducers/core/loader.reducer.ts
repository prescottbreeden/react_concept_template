import { LOADING_KEY } from 'redux/keys';
import { prop } from 'ramda';
import { LoaderAction } from 'types/core/loaderAction.type';
import { ReduxBaseAction } from 'types/core/baseAction.type';

// --[ constants ]-------------------------------------------------------------
export const SET_LOADER = `${LOADING_KEY} STARTED`;
export const REMOVE_LOADER = `${LOADING_KEY} ENDING`;

// --[ actions ]---------------------------------------------------------------
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

// --[ reducer ]---------------------------------------------------------------
const initialState: any[] = [];

export const loaderReducer = (loader = initialState, action: any) => {
  switch (true) {
    case action.type.includes(SET_LOADER):
      return [...loader, action.payload];

    case action.type.includes(REMOVE_LOADER):
      const { payload } = action;
      return loader.filter(({ id }: any) => {
        return id !== payload.id;
      });

    default:
      return loader;
  }
};

// --[ selectors ]-------------------------------------------------------------
export const selectLoader = (state: any) => {
  return prop(LOADING_KEY, state);
};
