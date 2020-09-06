import React, { FC } from 'react';
import { Loading } from 'components/Loading.component';
import { Notification } from 'components/Notification.component';

export const Page: FC<any> = (props) => {
  return (
    <div className="page">
      <div className="header">
        <h1>Demo</h1>
      </div>
      {props.children}
      <Notification />
      <Loading />
    </div>
  );
};
