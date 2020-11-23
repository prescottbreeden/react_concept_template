import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from 'redux/reducers/core/notifications.reducer';
import { Button, Input, InputLabel } from '@material-ui/core';
import { PersonValidation } from 'validations/person.validation';
import { Person } from 'types/feature/person.type';
import { compose, handleChangeEvent, safeGet } from 'utilities/general.utils';

interface PersonFormProps {
  person: Person;
  onChange: (event: ChangeEvent<any>) => void;
}
export const PersonForm: React.FC<PersonFormProps> = ({ onChange, person }) => {
  // -- dependencies --
  const dispatch = useDispatch();
  const {
    getError,
    resetValidationState,
    validateAll,
    validateOnChange,
    validateOnBlur,
  } = PersonValidation();

  // -- form logic --
  const handleChange = validateOnChange(
    compose(onChange, handleChangeEvent),
    person
  );
  const handleBlur = validateOnBlur(person);
  const savePerson = () => {
    if (validateAll(person)) {
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

  // -- lifecycle --
  useEffect(() => {
    resetValidationState();
  }, [person.personId]); //eslint-disable-line

  // -- display logic --
  const get = safeGet(person);

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
              onBlur={handleBlur}
              onChange={handleChange}
              value={get('name')}
            />
            {getError('name') && <p className="error">{getError('name')}</p>}
          </div>
        </div>
        <div className="form__row">
          <div>
            <InputLabel htmlFor="height">Height</InputLabel>
            <Input
              id="height"
              name="height"
              onBlur={handleBlur}
              onChange={handleChange}
              value={get('height')}
            />
            {getError('height') && (
              <p className="error">{getError('height')}</p>
            )}
          </div>
        </div>
        <div className="form__row">
          <div>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Input
              id="gender"
              name="gender"
              onBlur={handleBlur}
              onChange={handleChange}
              value={get('gender')}
            />
            {getError('gender') && (
              <p className="error">{getError('gender')}</p>
            )}
          </div>
        </div>
        <Button onClick={savePerson} className="button">
          Click Me to Submit
        </Button>
      </div>
    </div>
  );
};
