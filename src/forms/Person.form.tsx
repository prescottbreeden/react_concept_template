import React, { useEffect } from 'react';
import { PersonValidation } from 'validations/person.validation';
import { Person } from 'types/feature/person.type';
import { compose, handleChangeEvent, safeGet } from 'utilities/general.utils';
import { FormType } from 'types/core/form.type';
import { FlexRow } from 'layouts';
import { AmpInput } from 'components/AmpInput.component';

export const PersonForm: React.FC<FormType<Person>> = ({
  onChange,
  data,
  resetValidation,
  submitFailed,
}) => {
  // --[ dependencies ]--------------------------------------------------------
  const {
    getError,
    resetValidationState,
    validateAll,
    validateOnChange,
    validateOnBlur,
  } = PersonValidation();

  // --[ component logic ]-----------------------------------------------------
  const handleChange = validateOnChange(
    compose(onChange, handleChangeEvent),
    data
  );
  const handleBlur = validateOnBlur(data);
  // get :: string -> Person[string]
  const get = safeGet(data);

  // --[ lifecycle ]-----------------------------------------------------------
  useEffect(() => {
    resetValidationState();
  }, [data.personId]); //eslint-disable-line

  useEffect(() => {
    resetValidationState();
  }, [resetValidation]); //eslint-disable-line

  useEffect(() => {
    submitFailed && validateAll(data);
  }, [submitFailed, data]); //eslint-disable-line

  // --[ render logic ]--------------------------------------------------------

  return (
    <>
      <FlexRow>
        <h2>Edit Person</h2>
      </FlexRow>
      <FlexRow>
        <AmpInput
          getError={getError}
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={get('name')}
        />
        <AmpInput
          getError={getError}
          name="height"
          onBlur={handleBlur}
          onChange={handleChange}
          value={get('height')}
        />
        <AmpInput
          getError={getError}
          name="gender"
          onBlur={handleBlur}
          onChange={handleChange}
          value={get('gender')}
        />
      </FlexRow>
    </>
  );
};
