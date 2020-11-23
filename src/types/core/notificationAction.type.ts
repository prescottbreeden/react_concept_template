export interface NotificationAction {
  id?: number;
  message: string;
  status: 'success' | 'error' | 'warning';
}
