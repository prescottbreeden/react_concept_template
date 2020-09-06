import { ReduxBaseAction, NotificationAction } from 'types';
import { NOTIFICATION_KEY } from 'redux/keys';

export const SET_NOTIFICATION = `${NOTIFICATION_KEY} CREATE`;
export const REMOVE_NOTIFICATION = `${NOTIFICATION_KEY} REMOVE`;

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
