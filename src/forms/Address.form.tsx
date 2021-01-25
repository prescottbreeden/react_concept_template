import React, { FC, useEffect } from 'react';
import { FlexRow } from 'layouts';
import { FormType } from 'types/core/form.type';
import { compose, handleChangeEvent, safeGet } from 'utilities/general.utils';
import { Address } from 'types/feature/address.type';
import { AddressValidation } from 'validations/address.validation';
import { AmpInput } from 'components/AmpInput.component';

export const AddressForm: FC<FormType<Address>> = ({
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
  } = AddressValidation();

  // --[ component logic ]-----------------------------------------------------
  const handleOnBlur = validateOnBlur(data);
  const handleOnChange = validateOnChange(
    compose(onChange, handleChangeEvent),
    data
  );
  // get :: string -> address[string]
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
      <FlexRow>
        <AmpInput
          getError={getError}
          name="street1"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('street1')}
        />
        <AmpInput
          getError={getError}
          name="street2"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('street2')}
        />
      </FlexRow>
      <FlexRow>
        <AmpInput
          getError={getError}
          name="city"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('city')}
        />
        <AmpInput
          getError={getError}
          name="state"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('state')}
        />
        <AmpInput
          getError={getError}
          name="zipCode"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('zipCode')}
        />
      </FlexRow>
    </>
  );
};
