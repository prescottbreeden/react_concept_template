import React, { useEffect } from 'react';
import { mergeDeepRight } from 'ramda';
import { PhoneValidation } from 'validations/phone.validation';
import { Error, FlexColumn, Input } from 'layouts';
import { FormType } from 'types/core/form.type';
import { Phone } from 'types/feature/phone.type';
import {
  compose,
  safeGet,
  handleChangeEvent,
  formatPhone,
} from 'utilities/general.utils';
import { InputLabel } from '@material-ui/core';

export const PhoneForm: React.FC<FormType<Phone>> = ({
  data,
  onChange,
  resetValidation,
  submitFailed,
}) => {
  // -- validation functions --
  const {
    getError,
    resetValidationState,
    validateAll,
    validateOnBlur,
    validateOnChange,
  } = PhoneValidation();

  // -- component logic --
  const onPhoneChange = compose(
    onChange,
    mergeDeepRight(data),
    handleChangeEvent
  );
  const handleOnBlur = validateOnBlur(data);
  const handleOnChange = validateOnChange(onPhoneChange, data);

  // -- lifecycle --
  useEffect(() => {
    submitFailed && validateAll(data);
  }, [submitFailed, data]); //eslint-disable-line

  useEffect(() => {
    resetValidationState();
  }, [resetValidation]); //eslint-disable-line

  // -- render logic --
  const get = safeGet(data);

  return (
    <>
      <FlexColumn>
        <InputLabel htmlFor={`number_${get('id')}`}>Phone Number</InputLabel>
        <Input
          id={`number_${get('id')}`}
          name="number"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={formatPhone(get('number'))}
        />
        {getError('number') && <Error>{getError('number')}</Error>}
      </FlexColumn>
      <FlexColumn>
        <InputLabel htmlFor={`description_${get('id')}`}>
          Description
        </InputLabel>
        <Input
          id={`description_${get('id')}`}
          name="description"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('description')}
        />
        {getError('description') && <Error>{getError('description')}</Error>}
      </FlexColumn>
    </>
  );
};
