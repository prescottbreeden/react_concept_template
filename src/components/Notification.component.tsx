import { CSSProperties, FC } from 'react';
import { useSelector } from 'react-redux';
import { NotificationAction } from 'types/core/notificationAction.type';
import { selectNotifications } from 'redux/reducers/core/notifications.reducer';
import { compose } from 'utilities/general.utils';
import { equals, map, prop, randomString } from 'fp-tools';

export const Notification: FC = () => {
  // --[ helpers ]-------------------------------------------------------------
  const isSuccessNotification = compose(equals('success'), prop('status'));

  // --[ local state ]---------------------------------------------------------
  const notifications: NotificationAction[] = useSelector(selectNotifications);

  // --[ render logic ]--------------------------------------------------------
  const animation: CSSProperties = {};

  const success = (notification: NotificationAction) => (
    <div className="notification" key={randomString()}>
      <p>{prop('message', notification)}</p>
    </div>
  );

  const error = (notification: NotificationAction) => (
    <div className="notification notification--error" key={randomString()}>
      <p>{prop('message', notification)}</p>
    </div>
  );

  const render = (notification: NotificationAction) => {
    return isSuccessNotification(notification)
      ? success(notification)
      : error(notification);
  };

  return (
    <div className="notification__container">{map(render, notifications)}</div>
  );
};
