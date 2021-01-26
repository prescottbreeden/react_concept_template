import { FC, useEffect } from 'react';
import { mergeDeepRight } from 'ramda';
import { PhoneValidation } from 'validations/examples/phone.validation';
import { Error, FlexColumn } from 'layouts';
import { FormType } from 'types/core/form.type';
import { Phone } from 'types/feature/phone.type';
import {
  compose,
  safeGet,
  handleChangeEvent,
  formatPhone,
} from 'utilities/general.utils';

export const PhoneForm: FC<FormType<Phone>> = ({
  data,
  onChange,
  resetValidation,
  submitFailed,
}) => {
  // --[ dependencies ]--------------------------------------------------------
  const {
    getError,
    resetValidationState,
    validateAll,
    validateOnBlur,
    validateOnChange,
  } = PhoneValidation();

  // --[ component logic ]-----------------------------------------------------
  const onPhoneChange = compose(
    onChange,
    mergeDeepRight(data),
    handleChangeEvent
  );
  const handleOnBlur = validateOnBlur(data);
  const handleOnChange = validateOnChange(onPhoneChange, data);
  // get :: string -> Phone[string]
  const get = safeGet(data);

  // --[ lifecycle ]-----------------------------------------------------------
  useEffect(() => {
    submitFailed && validateAll(data);
  }, [submitFailed, data]); //eslint-disable-line

  useEffect(() => {
    resetValidationState();
  }, [resetValidation]); //eslint-disable-line

  // --[ render logic ]--------------------------------------------------------

  return (
    <>
      <FlexColumn>
        <label htmlFor={`number_${get('id')}`}>Phone Number</label>
        <input
          id={`number_${get('id')}`}
          name="number"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={formatPhone(get('number'))}
        />
        {getError('number') && <Error>{getError('number')}</Error>}
      </FlexColumn>
      <FlexColumn>
        <label htmlFor={`description_${get('id')}`}>Description</label>
        <input
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
