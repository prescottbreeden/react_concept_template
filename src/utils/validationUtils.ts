import { all } from 'de-formed-validations';
import { ValidationProps } from 'de-formed-validations/dist/validations/types';
import {
  length,
  lt as gt,
  gt as lt,
  trim,
  not,
  equals,
  map,
  split,
} from 'ramda';
import { Contact, Email } from 'types';
import { compose } from 'utils/utilities';

// isNumber :: string -> boolean
export const isNumber = compose(not, isNaN, Number);

// containsNoNumbers :: string -> boolean
export const containsNoNumbers = compose(
  all,
  map(compose(not, isNumber)),
  split('')
);

// onlyContainsNumbers :: string -> boolean
export const onlyContainsNumbers = compose(all, map(isNumber), split(''));

// lessThan :: num -> string -> boolean
export const isLessThan = (num: number) => compose(lt(num), length, trim);

// isLength :: num -> xs -> boolean
export const isLength = (num: number) => compose(equals(num), length);

// isStringValid :: string -> boolean
export const isStringValid = compose(gt(0), length, trim);

// validateEmail :: Email -> boolean
export const validateEmail = (email: Email) => {
  if (!email.email) return true;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// nameValidations :: string -> ValidationProp
export const nameValidations = (
  propertyName: string
): ValidationProps<Contact>[] => {
  return [
    {
      errorMessage: `${propertyName} is required.`,
      validation: isStringValid,
    },
    {
      errorMessage: `${propertyName} cannot contain numbers.`,
      validation: containsNoNumbers,
    },
    {
      errorMessage: `${propertyName} must be less than 20 characters.`,
      validation: isLessThan(20),
    },
  ];
};
