import { SET_LOADER } from 'redux/actions/core/loader.actions';

const initialState: boolean = false;

export const loaderReducer = (loader = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADER:
      return action.payload;

    default:
      return loader;
  }
};
