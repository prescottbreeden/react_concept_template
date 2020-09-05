import React, {useState} from 'react';
import { curry, mergeDeepRight } from 'ramda';
import {
  Button,
  Input,
  InputLabel
} from '@material-ui/core';

// Global Utility
const handleChange = curry((onChange: Function, name: string, event: any) => {
  let data: { [key: string]: any } = {};
  const { value } = event.target;
  data[name] = value;
  onChange(data, name, value);
});

const deepEqual = (a: any, b: any) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

// recursive version
const depthSearch = (obj: any, include: string[] = []) => {
  if (typeof obj !== 'object') return {};
  const keys = Object.keys(obj);
  return keys.reduce((prev: any, curr: any) => {
    if (curr === 'meta') {
      return prev;
    }
    if (typeof obj[curr] === 'object') {
      const search: {[key: string]: any} = depthSearch(obj[curr], include);
      return Object.keys(search).length > 0
        ? { ...prev, [curr]: search }
        : prev;
    }
    if (include.includes(curr)) {
      return { ...prev, [curr]: obj[curr] };
    }
    if (!deepEqual(obj[curr], obj.meta[curr])) {
      return { ...prev, [curr]: obj[curr] };
    }
    return prev;
  }, {});
};

// non-recursive version
const createJoeData = (obj: any, include: string[] = []) => {
  const keys = Object.keys(obj);
  return keys.reduce((prev: any, curr: any) => {
    if (curr === 'meta') return prev;
    if (!deepEqual(obj[curr], obj.meta[curr])) {
      return { ...prev, [curr]: obj[curr] };
    }
    if (include.includes(curr)) {
      return { ...prev, [curr]: obj[curr] };
    }
    return prev;
  }, {});
};

interface Meta<T> {
  meta?: T;
};

interface Hair extends Meta<Hair> {
  hairId: number;
  color: string;
  length: number;
};

interface Person extends Meta<Person> {
  personId: number;
  age: number;
  firstName: string;
  lastName: string;
  hair: Hair;
};

function App() {

  const API_DATA = {
    personId: 28,
    firstName: 'Bob',
    lastName: 'Ross',
    age: 42,
    hair: {
      hairId: 2,
      color: 'blue',
      length: 12
    }
  };

  // probably easiest if the API sets this data up
  const person = {
    ...API_DATA,
    hair: {
      ...API_DATA.hair,
      meta: API_DATA.hair,
    },
    meta: API_DATA,
  };

  const [state, setState] = useState<Person>(person);

  const onChange = handleChange((data: Partial<Person>) => {
    const update =  mergeDeepRight(state, data);
    setState(update);
  });

  const handleHair = handleChange((data: Partial<Hair>) => {
    const hair = mergeDeepRight(state.hair, data)
    const update = mergeDeepRight(state, { hair });
    setState(update);
  });

  const handleSave = () => {
    const nonRecursive = createJoeData(state);
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
            onChange={handleHair('color')}
            value={state.hair.color}
          />
        </div>
        <div>
          <InputLabel htmlFor="length">Hair Length</InputLabel>
          <Input 
            id="length"
            name="length"
            onChange={handleHair('length')}
            type="number"
            value={state.hair.length}
          />
        </div>
      </div>
      <Button onClick={handleSave}>Submit</Button>
    </div>
  );
}

export default App;
