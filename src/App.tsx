import React, {useState, useEffect} from 'react';
import './App.css';
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

// Recursive version!! yay!
const depthSearch = (obj: any, dict: any = {}) => {
  if (typeof obj !== 'object') return dict;
  const keys = Object.keys(obj);
  const data = keys.reduce((prev: any, curr: any) => {
    if (curr === 'meta') return prev;
    if (typeof obj[curr] === 'object') {
      const search = depthSearch(obj[curr]);
      if (Object.keys(search).length > 0) {
        prev = { ...prev, [curr]: search };
      }
    }
    else if (!deepEqual(obj[curr], obj.meta[curr])) {
      prev = { ...prev, [curr]: obj[curr] };
    }
    return prev;
  }, dict);
  return data;
};

const createJoeData = (object: any) => {
  const keys = Object.keys(object);
  const data = keys.reduce((prev: any, curr: any) => {
    if (curr === 'meta') return prev;
    if (!deepEqual(object[curr], object.meta[curr])) {
      prev = { ...prev, [curr]: object[curr] };
    }
    return prev;
  }, {})
  return {
    ...data,
  };
};

interface Meta<T> {
  meta?: T;
};

interface Hair extends Meta<Hair> {
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
      color: 'blue',
      length: 12
    }
  };

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
    const payload = createJoeData(state);
    const recursive = depthSearch(state);
    console.log('original', state.meta);
    console.log('payload', recursive);
  };

  useEffect(() => {
    console.log(state.hair.color);

  }, [state])

  return (
    <div style={{
      display: 'grid',
      placeItems: 'center',
      height: '100vh'
    }}>
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
      <div>
        <InputLabel htmlFor="color">Hair Color</InputLabel>
        <Input 
          id="color"
          name="color"
          onChange={handleHair('color')}
          value={state.hair.color}
        />
      </div>
      <Button onClick={handleSave}>Submit</Button>
    </div>
  );
}

export default App;
