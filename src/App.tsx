import React, {useState} from 'react';
import { curry, mergeDeepRight } from 'ramda';
import { Button, Input, InputLabel } from '@material-ui/core';

type KeyValuePair = {
  [key: string]: any
};

// Global Utility
const handleChange = curry((onChange: Function, name: string, event: any) => {
  let data: KeyValuePair = {};
  const { value } = event.target;
  data[name] = value;
  onChange(data, name, value);
});

const deepEqual = (a: any, b: any) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

/**
 *  Evaluate objects and nested objects for properties that have changed and 
 *  return all key-value pairs that have either been changed or are included
 *  in the include array.
 *  @param obj The object that is going to be sent to the API
 *  @param invlude An array of keys that should always be included
 *  @return Object
 */
const depthSearch = (obj: KeyValuePair, include: string[] = []) => {
  if (typeof obj !== 'object') return {};
  const keys = Object.keys(obj);
  return keys.reduce((prev: Partial<KeyValuePair>, key: string) => {
    if (key === 'meta') {
      return prev;
    }
    if (typeof obj[key] === 'object') {
      const search: KeyValuePair = depthSearch(obj[key], include);
      return Object.keys(search).length > 0
        ? { ...prev, [key]: search }
        : prev;
    }
    if (include.includes(key) || !deepEqual(obj[key], obj.meta[key])) {
      return { ...prev, [key]: obj[key] };
    }
    return prev;
  }, {});
};

// non-recursive version
const createJoeData = (obj: KeyValuePair, include: string[] = []) => {
  const keys = Object.keys(obj);
  return keys.reduce((prev: Partial<KeyValuePair>, key: string) => {
    if (key === 'meta') {
      return prev; 
    }
    if (!deepEqual(obj[key], obj.meta[key])) {
      return { ...prev, [key]: obj[key] };
    }
    if (include.includes(key)) {
      return { ...prev, [key]: obj[key] };
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
