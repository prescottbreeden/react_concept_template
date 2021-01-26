import { FC } from 'react';
import { Loading } from 'components/core/Loading.component';
import { Notification } from 'components/core/Notification.component';

export const BaseLayout: FC<any> = (props) => {
  return (
    <div className="layout--base">
      {props.children}
      <Notification />
      <Loading />
    </div>
  );
};
