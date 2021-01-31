import { useValidation } from 'de-formed-validations';
import { Phone } from 'types/feature/phone.type';
import {
  isLength,
  stringIsNotEmpty,
  stringIsNumbers,
} from 'utilities/validation.utils';
import { compose, removePhoneFormat } from 'utilities/general.utils';

// PhoneValidation :: () -> ValidationObject<Phone>
export const PhoneValidation = () => {
  return useValidation<Phone>({
    number: [
      {
        errorMessage: 'Number is required.',
        validation: compose(stringIsNotEmpty, removePhoneFormat),
      },
      {
        errorMessage: 'Can only have digits.',
        validation: compose(stringIsNumbers, removePhoneFormat),
      },
      {
        errorMessage: 'Must be 10 digits.',
        validation: compose(isLength(10), removePhoneFormat),
      },
    ],
    description: [
      {
        errorMessage: 'Description is required.',
        validation: stringIsNotEmpty,
      },
    ],
  });
};
