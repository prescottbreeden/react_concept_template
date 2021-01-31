import { FC, useEffect } from 'react';
import { FlexRow } from 'layouts';
import { FormType } from 'types/core/form.type';
import { compose, handleChangeEvent } from 'utilities/general.utils';
import { Address } from 'types/feature/address.type';
import { AddressValidation } from 'validations/examples/address.validation';
import { Input } from 'components/common/Input.component';
import { objProp } from 'fp-tools';

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
  const get = objProp(data);

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
        <Input
          error={getError('street1')}
          name="street1"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('street1')}
        />
        <Input
          error={getError('street2')}
          name="street2"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('street2')}
        />
      </FlexRow>
      <FlexRow>
        <Input
          error={getError('city')}
          name="city"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('city')}
        />
        <Input
          error={getError('state')}
          name="state"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('state')}
        />
        <Input
          error={getError('zipCode')}
          name="zipCode"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('zipCode')}
        />
      </FlexRow>
    </>
  );
};
