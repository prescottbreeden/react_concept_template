import React, { FC } from 'react';
import { EditPerson } from 'components/examples/EditPerson.component';
import { BaseLayout } from 'layouts/BaseLayout.layout';

interface StarWarsPageProps {}
export const StarWarsPage: FC<StarWarsPageProps> = () => {
  return (
    <>
      <BaseLayout>
        <EditPerson />
      </BaseLayout>
    </>
  );
};
