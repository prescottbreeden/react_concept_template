import { SET_LOADER, REMOVE_LOADER } from 'redux/actions/core/loader.actions';

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
