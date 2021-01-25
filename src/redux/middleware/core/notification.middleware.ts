import {
  SET_NOTIFICATION,
  setNotification,
  removeNotification,
} from 'redux/reducers/core/notifications.reducer';
import { mergeDeepRight } from 'ramda';
import { ReduxBaseAction } from 'types/core/baseAction.type';
import { NotificationAction } from 'types/core/notificationAction.type';

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
    }, payload.timeOut);
  } else {
    next(action);
  }
};
