export interface ReduxBaseAction<T> {
  type: string;
  payload: T;
  meta?: any;
}
