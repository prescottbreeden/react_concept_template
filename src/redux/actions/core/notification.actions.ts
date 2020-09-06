import { ReduxBaseAction, NotificationAction } from 'types';

export const SET_NOTIFICATION = 'CREATE_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const setNotification = ({
  message,
  status,
}: NotificationAction): ReduxBaseAction<NotificationAction> => {
  return {
    type: SET_NOTIFICATION,
    payload: { message, status },
  };
};

export const removeNotification = (id: number): ReduxBaseAction<number> => {
  return {
    type: REMOVE_NOTIFICATION,
    payload: id,
  };
};
