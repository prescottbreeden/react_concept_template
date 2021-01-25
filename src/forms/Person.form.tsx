import React, { useEffect } from 'react';
import { Input, InputLabel } from '@material-ui/core';
import { PersonValidation } from 'validations/person.validation';
import { Person } from 'types/feature/person.type';
import { compose, handleChangeEvent, safeGet } from 'utilities/general.utils';
import { FormType } from 'types/core/form.type';
import { Error, FlexColumn, FlexRow } from 'layouts';

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

  // -- component logic --
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
    <>
      <FlexRow>
        <h2>Edit Person</h2>
      </FlexRow>
      <FlexRow>
        <FlexColumn>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            id="name"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={get('name')}
          />
          {getError('name') && <Error>{getError('name')}</Error>}
        </FlexColumn>
        <FlexColumn>
          <InputLabel htmlFor="height">Height</InputLabel>
          <Input
            id="height"
            name="height"
            onBlur={handleBlur}
            onChange={handleChange}
            value={get('height')}
          />
          {getError('height') && <Error>{getError('height')}</Error>}
        </FlexColumn>
        <FlexColumn>
          <InputLabel htmlFor="gender">Gender</InputLabel>
          <Input
            id="gender"
            name="gender"
            onBlur={handleBlur}
            onChange={handleChange}
            value={get('gender')}
          />
          {getError('gender') && <Error>{getError('gender')}</Error>}
        </FlexColumn>
      </FlexRow>
    </>
  );
};
