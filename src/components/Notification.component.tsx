import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { NotificationAction } from 'types';
import { selectNotification } from 'redux/reducers/core/notifications.reducer';
import { compose } from 'utils/utilities';
import { prop, equals } from 'ramda';

export const Notification: FC = () => {
  const notification: NotificationAction = useSelector(selectNotification);

  const isSuccessNotification = compose(equals('success'), prop('status'));

  const className = notification
    ? 'notification notification--display'
    : 'notification';

  const success = (
    <div className={className}>
      <p>{notification && notification.message}</p>
    </div>
  );

  const error = (
    <div className={`${className} notification--error`}>
      <p>{notification && notification.message}</p>
    </div>
  );

  return isSuccessNotification(notification) ? success : error;
};
