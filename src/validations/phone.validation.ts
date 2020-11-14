import { useValidation } from 'de-formed-validations';
import { replace } from 'ramda';
import { Phone } from 'types';
import { compose } from 'utils/utilities';
import {
  isLength,
  isStringValid,
  onlyContainsNumbers,
} from 'utils/validationUtils';

export const PhoneValidation = () => {
  return useValidation<Phone>({
    number: [
      {
        errorMessage: 'Number is required.',
        validation: isStringValid,
      },
      {
        errorMessage: 'Can only have digits.',
        validation: compose(onlyContainsNumbers, replace(/-/g, '')),
      },
      {
        errorMessage: 'Must be 10 digits.',
        validation: compose(isLength(10), replace(/-/g, '')),
      },
    ],
    description: [
      {
        errorMessage: 'Description is required.',
        validation: isStringValid,
      },
    ],
  });
};
