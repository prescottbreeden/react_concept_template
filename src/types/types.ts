export interface KeyValuePair {
  [key: string]: any
};


export interface Meta<T> {
  meta?: T;
};

export interface Hair extends Meta<Hair> {
  hairId: number;
  color: string;
  length: number;
};

export interface Person extends Meta<Person> {
  personId: number;
  age: number;
  firstName: string;
  lastName: string;
  hair: Hair;
};

