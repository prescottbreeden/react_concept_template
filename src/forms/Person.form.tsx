import React, { ChangeEvent, useEffect } from 'react';
import { Person } from 'types';
import { useDispatch } from 'react-redux';
import { setNotification } from 'redux/reducers/core/notifications.reducer';
import { Button, Input, InputLabel } from '@material-ui/core';
import { PersonValidation } from 'validations/person.validation';

interface PersonFormProps {
  person: Person;
  onChange: (event: ChangeEvent<any>) => void;
}
export const PersonForm: React.FC<PersonFormProps> = ({ onChange, person }) => {
  // -- redux and state --------------------------------------------------------
  const dispatch = useDispatch();
  const v = PersonValidation();

  // -- form logic ---------------------------------------------------------
  const handleChange = v.validateOnChange(onChange, person);
  const handleBlur = v.validateOnBlur(person);
  const savePerson = () => {
    if (v.validateAll(person)) {
      dispatch(
        setNotification({
          status: 'success',
          message: 'Save successful',
        })
      );
    } else {
      dispatch(
        setNotification({
          status: 'error',
          message: 'Person is invalid.',
        })
      );
    }
  };

  // -- display logic ----------------------------------------------------------
  const error = (prop: keyof Person) =>
    v.getError(prop) ? <p>{v.getError(prop)}</p> : null;

  // -- lifecycle --------------------------------------------------------------
  useEffect(() => {
    v.resetValidationState();
  }, [person.personId]); //eslint-disable-line

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
          <div>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input
              id="name"
              name="name"
              onBlur={handleBlur as any}
              onChange={handleChange}
              value={person.name}
            />
            {error('name')}
          </div>
        </div>
        <div className="form__row">
          <div>
            <InputLabel htmlFor="height">Height</InputLabel>
            <Input
              id="height"
              name="height"
              onBlur={handleBlur as any}
              onChange={handleChange}
              value={person.height}
            />
            {error('height')}
          </div>
        </div>
        <div className="form__row">
          <div>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Input
              id="gender"
              name="gender"
              onBlur={handleBlur as any}
              onChange={handleChange}
              value={person.gender}
            />
            {error('gender')}
          </div>
        </div>
        <Button onClick={savePerson} className="button">
          Click Me to Submit
        </Button>
      </div>
    </div>
  );
};
