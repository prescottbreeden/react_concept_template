import React, {useState} from 'react';
import { mergeDeepRight } from 'ramda';
import { Button, Input, InputLabel } from '@material-ui/core';
import { Person, Hair } from './types/types';
import { depthSearch, handleChange, compose } from './utilities';

const DATA = {
  personId: 28,
  firstName: 'Bob',
  lastName: 'Ross',
  age: 42,
  hair: {
    hairId: 2,
    color: 'brown',
    length: 12
  }
};

const API_DATA = {
  ...DATA,
  hair: {
    ...DATA.hair,
    meta: DATA.hair,
  },
  meta: DATA,
};

function App() {

  const [state, setState] = useState<Person>(API_DATA);

  const updatePerson = compose(
    setState,
    mergeDeepRight(state),
  );

  const onChange = handleChange(updatePerson);

  const onHairChange = handleChange((data: Partial<Hair>) => {
    const hair = mergeDeepRight(state.hair, data)
    updatePerson({ hair });
  });

  const savePerson = () => {
    const recursive = depthSearch(state, ['personId', 'hairId']);
    console.log('original', state.meta);
    console.log('payload', recursive);
  };

  return (
    <div style={{
      display: 'grid',
      placeItems: 'center',
      height: '100vh'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%'}}>
        <div>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input 
            id="firstName"
            name="firstName"
            onChange={onChange('firstName')}
            value={state.firstName}
          />
        </div>
        <div>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input 
            id="lastName"
            name="lastName"
            onChange={onChange('lastName')}
            value={state.lastName}
          />
        </div>
        <div>
          <InputLabel htmlFor="age">Age</InputLabel>
          <Input 
            id="age"
            name="age"
            onChange={onChange('age')}
            type="number"
            value={state.age}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%'}}>
        <div>
          <InputLabel htmlFor="color">Hair Color</InputLabel>
          <Input 
            id="color"
            name="color"
            onChange={onHairChange('color')}
            value={state.hair.color}
          />
        </div>
        <div>
          <InputLabel htmlFor="length">Hair Length</InputLabel>
          <Input 
            id="length"
            name="length"
            onChange={onHairChange('length')}
            type="number"
            value={state.hair.length}
          />
        </div>
      </div>
      <Button onClick={savePerson}>Submit</Button>
    </div>
  );
}

export default App;
