import { NotificationAction, ReduxBaseAction } from 'types';
import { prop } from 'ramda';
import { NOTIFICATION_KEY } from 'redux/keys';

export const SET_NOTIFICATION = `${NOTIFICATION_KEY} CREATE`;
export const REMOVE_NOTIFICATION = `${NOTIFICATION_KEY} REMOVE`;

// -- Notification Reducer -----------------------------------------------------
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

// -- Notification Actions -----------------------------------------------------
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

// -- Select From State --------------------------------------------------------
export const selectNotification = (state: any) => {
  return prop(NOTIFICATION_KEY, state)[0];
};
