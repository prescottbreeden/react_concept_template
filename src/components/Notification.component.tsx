import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { NotificationAction } from 'types';
import { selectNotification } from 'redux/reducers/core/notifications.reducer';

export const Notification: FC = () => {
  const notification: NotificationAction = useSelector(selectNotification);
  const getClass = () => {
    return notification ? 'notification notification--display' : 'notification';
  };
  return (
    <div className={getClass()}>
      <p>{notification && notification.message}</p>
      {notification && notification.payload}
    </div>
  );
};
