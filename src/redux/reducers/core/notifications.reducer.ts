import { prop } from 'fp-tools';
import { NOTIFICATION_KEY } from 'redux/keys';
import { ReduxBaseAction } from 'types/core/baseAction.type';
import { NotificationAction } from 'types/core/notificationAction.type';

// --[ constants ]-------------------------------------------------------------
export const SET_NOTIFICATION = `${NOTIFICATION_KEY} CREATE`;
export const REMOVE_NOTIFICATION = `${NOTIFICATION_KEY} REMOVE`;

// --[ actions ]---------------------------------------------------------------
export const setNotification = ({
  id,
  message,
  status,
  timeOut = 5000,
}: NotificationAction): ReduxBaseAction<NotificationAction> => {
  return {
    type: SET_NOTIFICATION,
    payload: { id, message, status, timeOut },
  };
};

export const removeNotification = (id: number): ReduxBaseAction<number> => {
  return {
    type: REMOVE_NOTIFICATION,
    payload: id,
  };
};

// --[ reducer ]---------------------------------------------------------------
const initState: NotificationAction[] = [];

export const notificationsReducer = (
  notifications = initState,
  { payload, type }: ReduxBaseAction<NotificationAction | number>
) => {
  switch (true) {
    case type.includes(SET_NOTIFICATION):
      return [...notifications, payload];

    case type.includes(REMOVE_NOTIFICATION):
      return notifications.filter(({ id }: NotificationAction) => {
        return id !== payload;
      });

    default:
      return notifications;
  }
};

// --[ selectors ]-------------------------------------------------------------
export const selectNotifications = (state: any) => {
  return prop(NOTIFICATION_KEY, state);
};
