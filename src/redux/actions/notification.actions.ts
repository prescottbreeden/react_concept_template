export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const setNotification = ({ message, feature, status }: any) => {
  return {
    type: `${feature} ${SET_NOTIFICATION}`,
    payload: message,
    meta: {feature, status}
  };
};

export const removeNotification = ({ notificationId, feature }: any) => {
  return {
    type: `${feature} ${SET_NOTIFICATION}`,
    payload: notificationId,
    meta: {feature}
  };
};

