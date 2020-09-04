import React, {useState} from 'react';
import './App.css';
import { curry, mergeDeepRight } from 'ramda';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {Button} from '@material-ui/core';

// Global Utility
const handleChange = curry((onChange: Function, name: string, event: any) => {
  let data: { [key: string]: any } = {};
  const { value } = event.target;
  data[name] = value;
  onChange(data, name, value);
});

const deepEqual = (a: any, b: any) => {
  return JSON.stringify(a) === JSON.stringify(b);
}

const createJoeData = (object: any) => {
  const keys = Object.keys(object);
  const data = keys.reduce((prev: any, curr: any) => {
    if (curr === 'meta') return prev;
    if (!deepEqual(object[curr], object.meta[curr])) {
      prev = { ...prev, [curr]: object[curr] }
    }
    return prev;
  }, {})
  return data;
}

type Person = {
  age: number;
  firstName: string;
  lastName: string;
  meta?: any;
}

function App() {

  const API_DATA = {
    firstName: 'Bob',
    lastName: 'Ross',
    age: 42,
  };

  const person = {
    ...API_DATA,
    meta: API_DATA
  };

  const [state, setState] = useState<Person>(person);

  const onChange = handleChange((data: Partial<any>) => {
    const update =  mergeDeepRight(state, data);
    setState(update);
  });

  const handleSave = () => {
    const payload = createJoeData(state);
    console.log('original', state.meta);
    console.log('payload', payload);
  }

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
        <InputLabel htmlFor="lastName">Age</InputLabel>
        <Input 
          id="age"
          name="age"
          onChange={onChange('age')}
          type="number"
          value={state.age}
        />
      </div>
      <Button onClick={handleSave}>Submit</Button>
    </div>
  );
}

export default App;
