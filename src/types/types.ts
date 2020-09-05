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

export interface ApiAction {
  type: string;
  payload: any;
  meta: {
    method?: string;
    url?: string;
    feature: string;
  };
}

export interface ApiRequest {
  body: any;
  method: string;
  url: string;
  feature: string;
};

export interface ApiResponse {
  payload?: any[];
  error?: string;
  feature: string;
};
