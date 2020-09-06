import {
  SET_NOTIFICATION,
  setNotification,
  removeNotification,
} from 'redux/actions/core/notification.actions';

export const notificationMiddleware = () => (next: Function) => (
  action: any
) => {
  if (action.type.includes(SET_NOTIFICATION)) {
    const { payload } = action;
    const id = new Date().getMilliseconds();
    const notification = {
      ...payload,
      id,
    };
    next(setNotification(notification));

    setTimeout(() => {
      next(removeNotification({ id }));
    }, 2500);
  } else {
    next(action);
  }
};
