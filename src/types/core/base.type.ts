export interface KeyValuePair {
  [key: string]: any;
}

export interface Meta<T> {
  meta?: T;
}

export interface NotificationAction {
  id?: any;
  message: string;
  status: 'success' | 'error' | 'warning';
}
