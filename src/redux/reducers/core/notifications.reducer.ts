import { prop } from 'ramda';
import { NOTIFICATION_KEY } from 'redux/keys';
import { ReduxBaseAction } from 'types/core/baseAction.type';
import { NotificationAction } from 'types/core/notificationAction.type';

export const SET_NOTIFICATION = `${NOTIFICATION_KEY} CREATE`;
export const REMOVE_NOTIFICATION = `${NOTIFICATION_KEY} REMOVE`;

// -- actions ------------------------------------------------------------------
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

// -- reducer ------------------------------------------------------------------
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

// -- selectors ----------------------------------------------------------------
export const selectNotification = (state: any) => {
  return prop(NOTIFICATION_KEY, state)[0];
};
