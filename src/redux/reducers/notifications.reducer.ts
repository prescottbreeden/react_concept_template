import {SET_NOTIFICATION, REMOVE_NOTIFICATION} from "redux/actions/notification.actions";

const initState: any[] = [];

export const notificationsReducer = (notifications = initState, action: any) => {
  switch(true) {
    case action.type.includes(SET_NOTIFICATION):
      return [...notifications, action.payload];

    case action.type.includes(REMOVE_NOTIFICATION):
      return notifications.filter(({id}: any) => id !== action.payload);

    default:
      return notifications;
  }
}
