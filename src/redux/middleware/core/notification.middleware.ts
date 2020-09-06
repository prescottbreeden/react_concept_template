import {
  SET_NOTIFICATION,
  setNotification,
  removeNotification,
} from 'redux/actions/notification.actions';
import { mergeDeepRight } from 'ramda';
import { ReduxBaseAction, NotificationAction } from 'types';

export const notificationMiddleware = () => (next: Function) => (
  action: ReduxBaseAction<NotificationAction>
) => {
  if (action.type.includes(SET_NOTIFICATION)) {
    const { payload } = action;
    const id = new Date().getMilliseconds();
    const notification = mergeDeepRight(payload, { id });
    next(setNotification(notification));

    setTimeout(() => {
      next(removeNotification(id));
    }, 2500);
  } else {
    next(action);
  }
};
