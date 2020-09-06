import {
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from 'redux/actions/core/notification.actions';
import { NotificationAction } from 'types';
import { prop } from 'ramda';
import { NOTIFICATION_KEY } from 'redux/keys';

const initState: NotificationAction[] = [];

export const notificationsReducer = (
  notifications = initState,
  action: any
) => {
  switch (true) {
    case action.type.includes(SET_NOTIFICATION):
      return [...notifications, action.payload];

    case action.type.includes(REMOVE_NOTIFICATION):
      const { payload } = action;
      return notifications.filter(({ id }: NotificationAction) => {
        return id !== payload.id;
      });

    default:
      return notifications;
  }
};

// -- Select From State --------------------------------------------------------
export const selectNotification = (state: any) => {
  return prop(NOTIFICATION_KEY, state)[0];
};
