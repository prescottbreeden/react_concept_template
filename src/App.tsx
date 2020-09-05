import React, {useState} from 'react';
import { mergeDeepRight } from 'ramda';
import { Button, Input, InputLabel } from '@material-ui/core';
import { Person, emptyPerson } from './types';
import { depthSearch, handleChange, compose, normalizeDatum } from './utilities';

const fakeData = normalizeDatum(emptyPerson());

function App() {

  const [state, setState] = useState<Person>(fakeData);

  const updatePerson = compose(
    setState,
    mergeDeepRight(state),
  );

  const onChange = handleChange(updatePerson);

  const savePerson = () => {
    const postData = depthSearch(state, ['personId', 'hairId']);
    alert(JSON.stringify(postData, null, 2))
  };

  return (
    <>
      <h1>Demo</h1>
      <div className="container">
        <div className="json">
          <h2>GET Data</h2>
          <pre>
            {JSON.stringify(fakeData, null, 2)}
          </pre>
          <h2>POST Data</h2>
          <pre>
            {JSON.stringify(depthSearch(state, ['personId']), null, 2)}
          </pre>
        </div>
        <div className="form__container">
          <h2>Form Sample</h2>
          <div className="form">
            <div className="form__row">
              <div>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input 
                  id="name"
                  name="name"
                  onChange={onChange('name')}
                  value={state.name}
                />
              </div>
              <div>
                <InputLabel htmlFor="height">Height</InputLabel>
                <Input 
                  id="height"
                  name="height"
                  onChange={onChange('height')}
                  value={state.height}
                />
              </div>
              <div>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Input 
                  id="gender"
                  name="gender"
                  onChange={onChange('gender')}
                  value={state.gender}
                />
              </div>
              <Button onClick={savePerson}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
