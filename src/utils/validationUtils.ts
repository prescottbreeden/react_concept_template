import { any, length, lt as gt, gt as lt, trim } from 'ramda';
import { Email } from 'types';
import { compose } from 'utils/utilities';

//  onlyContainsLetters :: string -> boolean
export const onlyContainsLetters = any<string>(compose(isNaN, Number));

//  lessThan20Characters :: string -> boolean
export const lessThan20Characters = compose(lt(20), length, trim);

//  isStringValid :: string -> boolean
export const isStringValid = compose(gt(0), length, trim);

//  validateEmail :: string -> boolean
export const validateEmail = (email: Email) => {
  if (!email.email) return true;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
