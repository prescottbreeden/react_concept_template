import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DataSelection } from 'components/DataSelection.component';
import { DataState } from 'components/DataState.component';
import { DevTools } from 'components/DevTools';
import { readPerson } from 'services/person.service';
import { mergeDeepRight } from 'ramda';
import { PersonForm } from 'forms/Person.form';
import { emptyPerson, Person } from 'types/feature/person.type';
import { compose } from 'utilities/general.utils';
import { BaseLayout } from 'layouts/BaseLayout.layout';

export const EditPerson: React.FC = () => {
  // -- redux and state --------------------------------------------------------
  const dispatch = useDispatch();
  const [person, setPerson] = useState<Person>(emptyPerson());

  // -- onChange logic ---------------------------------------------------------
  const onChange = compose(setPerson, mergeDeepRight(person));

  // -- lifecycle --------------------------------------------------------------
  useEffect(() => {
    dispatch(readPerson());
  }, [dispatch]);

  return (
    <>
      <BaseLayout>
        <div className="container">
          <DataState state={person} />
          <div className="elements">
            <PersonForm person={person} onChange={onChange} />
            <DataSelection setState={setPerson} />
            <DevTools />
          </div>
        </div>
      </BaseLayout>
    </>
  );
};
