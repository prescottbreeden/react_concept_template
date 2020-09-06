import { SET_LOADER, REMOVE_LOADER } from 'redux/actions/core/loader.actions';
import { LOADING_KEY } from 'redux/keys';
import { prop } from 'ramda';

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

// -- Select From State --------------------------------------------------------
export const selectLoader = (state: any) => {
  return prop(LOADING_KEY, state);
};
