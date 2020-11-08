import React from 'react';
import { Person } from 'types';
import { useDispatch } from 'react-redux';
import { setNotification } from 'redux/reducers/core/notifications.reducer';
import { Button, Input, InputLabel } from '@material-ui/core';

interface PersonFormProps {
  person: Person;
  onChange: Function;
}
export const PersonForm: React.FC<PersonFormProps> = ({ onChange, person }) => {
  const dispatch = useDispatch();

  // -- save/load ------------------------------
  const savePerson = () => {
    dispatch(
      setNotification({
        status: 'success',
        message: 'Save successful',
      })
    );
  };
  return (
    <div className="form__container">
      <h2>Form Sample</h2>
      <br />
      <p>
        Select a Person on the right to load their data and then change their
        data to see what the payload to the API would be.
      </p>
      <div className="form">
        <div className="form__row">
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            id="name"
            name="name"
            onChange={onChange('name')}
            value={person.name}
          />
        </div>
        <div className="form__row">
          <InputLabel htmlFor="height">Height</InputLabel>
          <Input
            id="height"
            name="height"
            onChange={onChange('height')}
            value={person.height}
          />
        </div>
        <div className="form__row">
          <InputLabel htmlFor="gender">Gender</InputLabel>
          <Input
            id="gender"
            name="gender"
            onChange={onChange('gender')}
            value={person.gender}
          />
        </div>
        <Button onClick={savePerson} className="button">
          Click Me to Submit
        </Button>
      </div>
    </div>
  );
};
