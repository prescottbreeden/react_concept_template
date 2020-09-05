import {ApiAction, KeyValuePair} from "types";
import {dataNormalized} from "redux/actions/data.actions";

export const normalizeMiddleware = ({dispatch}: any) => (next: Function) => (action: ApiAction) => {
  if (action.type.includes('SET')) {

    // notify about the transformation
    dispatch(dataNormalized({ feature: action.meta.feature }));

    // normalize data
    const data = action.payload.reduce((acc: KeyValuePair, item: any) => {
      // normalize function
      acc[item] = item;
      return acc;
    }, {});
    next({...action, payload: data });

  } else {
    next(action);
  }
};
