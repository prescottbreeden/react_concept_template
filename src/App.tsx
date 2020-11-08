import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mergeDeepRight } from 'ramda';
import { Person, emptyPerson } from 'types';
import { handleChange, compose } from './utils/utilities';
import { readPerson } from 'services/person.service';
import { Page } from 'layout/basic.layout';
import { DataSelection } from 'components/DataSelection.component';
import { DataState } from 'components/DataState.component';
import { DevTools } from 'components/DevTools';
import { PersonForm } from 'forms/Person.form';

function App() {
  // -- redux and state ------------------------
  const dispatch = useDispatch();
  const [state, setState] = useState<Person>(emptyPerson());

  // -- onChange logic -------------------------
  const updatePerson = compose(setState, mergeDeepRight(state));
  const onChange = handleChange(updatePerson);

  useEffect(() => {
    dispatch(readPerson());
  }, [dispatch]);

  return (
    <Page>
      <div className="container">
        <DataState state={state} />
        <div className="elements">
          <PersonForm person={state} onChange={onChange} />
          <DataSelection setState={setState} state={state} />
          <DevTools />
        </div>
      </div>
    </Page>
  );
}

export default App;
