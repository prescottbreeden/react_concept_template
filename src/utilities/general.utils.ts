import { prop } from 'fp-tools';
import { converge, curry, defaultTo, map, mergeDeepRight, reduce } from 'ramda';

type KeyValuePair = {
  [key: string]: any;
};

// *randomString* :: () -> string
export const randomString = () => Math.random().toString(36).substring(7);

// *trace* :: string -> a -> a
export const trace = curry((txt: string, x: any) => {
  console.log(txt, x);
  return x;
});

// less fussy version of compose
// compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
export const compose = (...fns: Function[]) => (x: any) =>
  fns.reduceRight((y: any, f: any) => f(y), x);

// prop :: a -> obj -> obj[a] | undefined
// export const prop = curry((a: any, obj: any) => (obj ? obj[a] : undefined));

// set :: string -> a -> { [string]: a }
export const set = curry((name: string, value: any) => ({ [name]: value }));

// handleChangeEvent :: event -> obj
export const handleChangeEvent = compose(
  converge(set, [prop('name'), prop('value')]),
  prop('target')
);

// safeGet :: obj -> string -> obj[string] | string
export function safeGet<T>(obj: T) {
  return function (property: keyof T) {
    return compose(defaultTo(''), prop(property))(obj);
  };
}

// replaceItem :: [a] -> a -> [a]
export const replaceItem = curry((list: any[], b: any) => {
  return list.map((a: any) => (a.id === b.id ? b : a));
});

// all :: [bool] -> bool
export const all = reduce((a: boolean, b: boolean) => (a ? b : a), true);

// formatPhone :: string -> string
export const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  const match = digits.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]} - ${match[3]}`;
  }
  return phone;
};

// idOrRandom :: obj -> string
export const idOrRandom = compose(defaultTo(randomString()), prop('id'));

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
