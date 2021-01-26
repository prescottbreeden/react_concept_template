import { useValidation } from 'de-formed-validations';
import { Address } from 'types/feature/address.type';
import { stringIsNotEmpty } from 'utilities/validation.utils';

// AddressValidation :: () -> ValidationObject<Address>
export const AddressValidation = () => {
  return useValidation<Address>({
    street1: [
      {
        errorMessage: 'Street1 is required.',
        validation: stringIsNotEmpty,
      },
    ],
    street2: [
      {
        errorMessage: 'Street2 is required.',
        validation: stringIsNotEmpty,
      },
    ],
  });
};
