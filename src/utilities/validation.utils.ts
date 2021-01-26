import { length, trim, not, test } from 'ramda';
import { all, compose, equals, lt, gt, map, split } from 'fp-tools';

// regular expressions
const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// isLength :: num -> xs -> boolean
export const isLength = (num: number) => compose(equals(num), length);

// isNumber :: string -> boolean
export const isNumber = compose(not, isNaN, Number);

// isTruthy :: a -> boolean
export const isTruthy = (a: any) => !!a;

// containsNoNumbers :: string -> boolean
export const containsNoNumbers = test(/^[^0-9()]+$/);

// onlyContainsNumbers :: string -> boolean
export const stringIsNumbers = compose(all(isTruthy), map(isNumber), split(''));

// lessThan :: num -> string -> boolean
export const stringIsLessThan = (num: number) => compose(lt(num), length, trim);

// isStringValid :: string -> boolean
export const stringIsNotEmpty = compose(gt(0), length, trim);

// validateEmail :: string -> boolean
export const emailIsValid = test(emailRegEx);
