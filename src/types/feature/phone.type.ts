import { randomString } from 'utilities/general.utils';

export type Phone = {
  id: string;
  description: string;
  number: string;
};

export const emptyPhone = (): Phone => {
  return {
    id: randomString(),
    description: '',
    number: '',
  };
};
