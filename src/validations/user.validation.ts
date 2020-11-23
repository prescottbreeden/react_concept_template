import { all, useValidation } from 'de-formed-validations';
import { map } from 'ramda';
import { PhoneValidation } from './phone.validation';
import { compose } from 'utilities/general.utils';
import { User } from 'types/feature/user.type';
import { emailIsValid, stringIsNotEmpty } from 'utilities/validation.utils';

// UserValidation :: () -> ValidationObject<Contact>
export const UserValidation = () => {
  const { validateAll: validatePhone } = PhoneValidation();
  return useValidation<User>({
    firstName: [
      {
        errorMessage: 'First Name is required.',
        validation: stringIsNotEmpty,
      },
    ],
    lastName: [
      {
        errorMessage: 'Last Name is required.',
        validation: stringIsNotEmpty,
      },
    ],
    emails: [
      {
        errorMessage: 'Not all emails provided are valid.',
        validation: compose(all, map(emailIsValid)),
      },
    ],
    phones: [
      {
        errorMessage: 'Not all phones provided are valid.',
        validation: compose(all, map(validatePhone)),
      },
    ],
  });
};
