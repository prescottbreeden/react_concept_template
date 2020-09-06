import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {NotificationAction} from "types";
import {getNotification} from 'redux/selectors/notification.selectors';

export const Notification: FC = () => {
  const notification: NotificationAction = useSelector(getNotification);
  const getClass = () => {
    return notification
      ? "notification notification--display"
      : "notification";
  };
  return (
    <div className={getClass()}>
      <p>
        {notification && notification.message}
      </p>
    </div>
  );
}
