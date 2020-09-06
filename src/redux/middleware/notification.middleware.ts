import {SET_NOTIFICATION, setNotification, removeNotification} from "redux/actions/notification.actions";

export const notificationMiddleware = () => (next: Function) => (action: any) => {
  if (action.type.includes(SET_NOTIFICATION)) {
    const { payload, meta } = action;
    const id = new Date().getMilliseconds();
    const notification = {
      id,
      message: payload,
    };
    next(setNotification({
      message: notification,
      feature: meta.feature,
      status: meta.status,
    }));

    setTimeout(() => {
      next(removeNotification({ notificationId: id, feature: meta.feature }));
    }, 1500);
  } else {
    next(action);
  }
}
