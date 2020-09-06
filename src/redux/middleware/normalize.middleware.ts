import {ApiAction } from "types";
import {dataNormalized} from "redux/actions/data.actions";
import {normalizeArray} from "utilities";

export const normalizeMiddleware = ({dispatch}: any) => (next: Function) => (action: ApiAction) => {
  if (action.type.includes('SET')) {

    const data = normalizeArray(action.payload);
    next({...action, payload: data });
    dispatch(dataNormalized({ feature: action.meta.feature }));

  } else {
    next(action);
  }
};
