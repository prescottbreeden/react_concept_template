import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Person, emptyPerson } from 'types';
import { Page } from 'layout/basic.layout';
import { DataSelection } from 'components/DataSelection.component';
import { DataState } from 'components/DataState.component';
import { DevTools } from 'components/DevTools';
import { PersonForm } from 'forms/Person.form';
import { readPerson } from 'services/person.service';
import { mergeDeepRight } from 'ramda';
import { handleChange, compose } from './utils/utilities';

function App() {
  // -- redux and state --------------------------------------------------------
  const dispatch = useDispatch();
  const [person, setPerson] = useState<Person>(emptyPerson());

  // -- onChange logic ---------------------------------------------------------
  const onChange = handleChange(compose(setPerson, mergeDeepRight(person)));

  // -- lifecycle --------------------------------------------------------------
  useEffect(() => {
    dispatch(readPerson());
  }, [dispatch]);

  return (
    <Page>
      <div className="container">
        <DataState state={person} />
        <div className="elements">
          <PersonForm person={person} onChange={onChange} />
          <DataSelection setState={setPerson} />
          <DevTools />
        </div>
      </div>
    </Page>
  );
}

export default App;
