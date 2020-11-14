import { KeyValuePair, Phone } from 'types';
import { curry, map, mergeDeepRight } from 'ramda';
import { ChangeEvent } from 'react';

/**
 * Creates a random 7 character string.
 * @return string
 */
export const randomString = () => Math.random().toString(36).substring(7);

/**
 *  Compose function that is a little more friendly to use with typescript.
 *  @param fns any number of comma-separated functions
 *  @return new function
 */
export const compose = (...fns: Function[]) => (x: any) =>
  fns.reduceRight((y: any, f: any) => f(y), x);

/**
 *  Curried function that takes the output of an event, wraps it into an
 *  object by the name of the event and then executes the onChange function
 *  providing the key/value pair as the argument.
 *  @param onChange Function to be executed with the event data
 *  @param event
 *  @return void
 */
export const handleChange = (event: ChangeEvent<any>) => {
  if (!event) return;
  const { name, value } = event.target;
  return { [name]: value };
};

/**
 *  Evaluate any two values for deep equality
 *  @param a any value
 *  @param b any value
 *  @return boolean
 */
export const deepEqual = (a: unknown, b: unknown) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

/**
 *  Evaluate objects and nested objects for properties that have changed and
 *  return all key-value pairs that have either been changed or are included
 *  in the include array.
 *  @param obj The object that is going to be sent to the API
 *  @param invlude An array of keys that should always be included
 *  @return Object
 */
export const depthSearch = (obj: KeyValuePair, include: string[] = []) => {
  if (typeof obj !== 'object') return {};
  const keys = Object.keys(obj);
  return keys.reduce((prev: Partial<KeyValuePair>, key: string) => {
    if (key === 'meta') {
      return prev;
    }
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      const search: KeyValuePair = depthSearch(obj[key], include);
      return Object.keys(search).length > 0
        ? mergeDeepRight(prev, { [key]: search })
        : prev;
    }
    if (include.includes(key) || !deepEqual(obj[key], obj.meta[key])) {
      return mergeDeepRight(prev, { [key]: obj[key] });
    }
    return prev;
  }, {});
};

// non-recursive version of depthSearch
export const createJoeData = (obj: KeyValuePair, include: string[] = []) => {
  const keys = Object.keys(obj);
  return keys.reduce((prev: Partial<KeyValuePair>, key: string) => {
    if (key === 'meta') {
      return prev;
    }
    if (include.includes(key) || !deepEqual(obj[key], obj.meta[key])) {
      return mergeDeepRight(prev, { [key]: obj[key] });
    }
    return prev;
  }, {});
};

/**
 *  Normalize data received from API to contain meta for each level.
 *  @param datum The object to be normalized with meta information
 *  @return Object
 */
export const normalizeDatum = (datum: any): any => {
  if (typeof datum !== 'object') return datum;
  const keys = Object.keys(datum);
  keys.forEach((key: string) => {
    if (typeof datum[key] === 'object' && !(datum[key] instanceof Array)) {
      return normalizeDatum(datum[key]);
    }
  });
  return mergeDeepRight(datum, { meta: datum });
};

/**
 *  Normalize array data received from API to contain meta for each level.
 *  @param data The array to be normalized with meta information
 *  @return Array
 */
export const normalizeArray = (data: any[]) => {
  return map((datum: any) => {
    return normalizeDatum(datum);
  }, data);
};

// debug
export const trace = curry((txt: string, x: any) => {
  console.log(txt, x);
  return x;
});

// upsert :: [a] -> b -> [a]
export const upsert = (list: Phone[]) => (b: Phone) => {
  return list.map((a: Phone) => (a.id === b.id ? b : a));
};
