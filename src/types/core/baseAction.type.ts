export interface ReduxBaseAction<T> {
  meta?: any;
  payload: T;
  type: string;
}
