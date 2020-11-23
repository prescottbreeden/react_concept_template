// import { curry, map, mergeDeepRight } from 'ramda';
import { ChangeEvent } from 'react';
// import {Phone} from 'types/feature/phone.type';

// /**
//  * Creates a random 7 character string.
//  * @return string
//  */
// export const randomString = () => Math.random().toString(36).substring(7);

// /**
//  *  Compose function that is a little more friendly to use with typescript.
//  *  @param fns any number of comma-separated functions
//  *  @return new function
//  */
// export const compose = (...fns: Function[]) => (x: any) =>
//   fns.reduceRight((y: any, f: any) => f(y), x);

// /**
//  *  Curried function that takes the output of an event, wraps it into an
//  *  object by the name of the event and then executes the onChange function
//  *  providing the key/value pair as the argument.
//  *  @param onChange Function to be executed with the event data
//  *  @param event
//  *  @return void
//  */
// export const handleChange = (event: ChangeEvent<any>) => {
//   if (!event) return;
//   const { name, value } = event.target;
//   return { [name]: value };
// };

// // non-recursive version of depthSearch
// // export const createJoeData = (obj: KeyValuePair, include: string[] = []) => {
// //   const keys = Object.keys(obj);
// //   return keys.reduce((prev: Partial<KeyValuePair>, key: string) => {
// //     if (key === 'meta') {
// //       return prev;
// //     }
// //     if (include.includes(key) || !deepEqual(obj[key], obj.meta[key])) {
// //       return mergeDeepRight(prev, { [key]: obj[key] });
// //     }
// //     return prev;
// //   }, {});
// // };

// // debug
// export const trace = curry((txt: string, x: any) => {
//   console.log(txt, x);
//   return x;
// });

// // upsert :: [a] -> b -> [a]
// export const upsert = (list: Phone[]) => (b: Phone) => {
//   return list.map((a: Phone) => (a.id === b.id ? b : a));
// };
