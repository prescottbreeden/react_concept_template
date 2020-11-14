import { useValidation } from 'de-formed-validations';
import { any, equals, length, lt as gt, not, replace, trim } from 'ramda';
import { Phone } from 'types';
import { compose } from 'utils/utilities';

export const PhoneValidation = () => {
  return useValidation<Phone>({
    number: [
      {
        errorMessage: 'Number is required.',
        validation: compose(gt(0), length, trim),
      },
      {
        errorMessage: 'Can only have digits.',
        validation: any<string>(compose(not, isNaN, Number)),
      },
      {
        errorMessage: 'Must be 10 digits.',
        validation: compose(equals(10), length, replace(/-/g, '')),
      },
    ],
    description: [
      {
        errorMessage: 'Description is required.',
        validation: compose(gt(0), length, trim),
      },
    ],
  });
};
