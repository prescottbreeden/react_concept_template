import React, { FC } from 'react';
import { CreateUser } from 'components/examples/CreateContact.component';
import { BaseLayout } from 'layouts/BaseLayout.layout';

interface UserPageProps {}
export const UserPage: FC<UserPageProps> = (props) => {
  return (
    <>
      <BaseLayout>
        <CreateUser />
      </BaseLayout>
    </>
  );
};
