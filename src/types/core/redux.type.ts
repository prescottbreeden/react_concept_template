export interface ReduxBaseAction<T> {
  type: string;
  payload: T;
  meta?: any;
}

export interface NotificationAction {
  id?: number;
  message: string;
  status: 'success' | 'error' | 'warning';
  payload?: any;
}

export interface LoaderAction {
  id?: number;
  feature: string;
}
