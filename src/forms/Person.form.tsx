import React, { useEffect } from 'react';
import { Input, InputLabel } from '@material-ui/core';
import { PersonValidation } from 'validations/person.validation';
import { Person } from 'types/feature/person.type';
import { compose, handleChangeEvent, safeGet } from 'utilities/general.utils';
import { FormType } from 'types/core/form.type';

export const PersonForm: React.FC<FormType<Person>> = ({
  onChange,
  data,
  resetValidation,
  submitFailed,
}) => {
  // -- dependencies --
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
    data
  );
  const handleBlur = validateOnBlur(data);

  // -- lifecycle --
  useEffect(() => {
    resetValidationState();
  }, [data.personId]); //eslint-disable-line

  useEffect(() => {
    resetValidationState();
  }, [resetValidation]); //eslint-disable-line

  useEffect(() => {
    submitFailed && validateAll(data);
  }, [submitFailed, data]); //eslint-disable-line

  // -- display logic --
  const get = safeGet(data);

  return (
    <div className="form__container">
      <h2>Form Sample</h2>
      <br />
      <p>
        Select a data on the right to load their data and then change their data
        to see what the payload to the API would be.
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
      </div>
    </div>
  );
};
