import React, { FC } from 'react';
import { Loading } from 'components/Loading.component';
import { Notification } from 'components/Notification.component';

export const BaseLayout: FC<any> = (props) => {
  return (
    <div className="page">
      {props.children}
      <Notification />
      <Loading />
    </div>
  );
};
