import { all, useValidation } from 'de-formed-validations';
import { map } from 'ramda';
import { PhoneValidation } from './phone.validation';
import { Contact, Email } from 'types';
import { compose } from 'utils/utilities';
import {
  isStringValid,
  lessThan20Characters,
  onlyContainsLetters,
  validateEmail,
} from 'utils/validationUtils';

export const ContactValidation = () => {
  const { validateAll: validatePhone } = PhoneValidation();
  return useValidation<Contact>({
    firstName: [
      {
        errorMessage: 'First Name is required.',
        validation: isStringValid,
      },
      {
        errorMessage: 'First Name can only contain letters',
        validation: onlyContainsLetters,
      },
      {
        errorMessage: 'First Name must be less than 20 characters.',
        validation: lessThan20Characters,
      },
    ],
    lastName: [
      {
        errorMessage: 'Last Name is required.',
        validation: isStringValid,
      },
      {
        errorMessage: 'Last Name must be less than 20 characters.',
        validation: lessThan20Characters,
      },
    ],
    subscriptionEmail: [
      {
        errorMessage: 'Please provide an email for your subscription service.',
        validation: (email: Email, contact: Contact) => {
          return contact.isSubcribed ? isStringValid(email) : true;
        },
      },
      {
        errorMessage: 'Email is invalid.',
        validation: (email: Email, contact: Contact) => {
          return contact.isSubcribed ? validateEmail(email) : true;
        },
      },
    ],
    emails: [
      {
        errorMessage: 'Not all emails provided are valid.',
        validation: compose(all, map(validateEmail)),
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
