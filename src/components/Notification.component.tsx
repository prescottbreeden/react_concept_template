import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { NotificationAction } from 'types/core/notificationAction.type';
import { selectNotification } from 'redux/reducers/core/notifications.reducer';
import { compose } from 'utilities/general.utils';
import { prop, equals } from 'ramda';

export const Notification: FC = () => {
  // -- helpers ----------------------------------------------------------------
  const isSuccessNotification = compose(equals('success'), prop('status'));

  // -- redux and state --------------------------------------------------------
  const notification: NotificationAction = useSelector(selectNotification);

  // -- display logic ----------------------------------------------------------
  const className = notification
    ? 'notification notification--display'
    : 'notification';

  const success = (
    <div className={className}>
      <p>{prop('message', notification)}</p>
    </div>
  );

  const error = (
    <div className={`${className} notification--error`}>
      <p>{prop('message', notification)}</p>
    </div>
  );

  return isSuccessNotification(notification) ? success : error;
};
