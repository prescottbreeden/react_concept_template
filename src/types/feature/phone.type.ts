import { randomString } from 'utilities/general.utils';
import { Base } from './base.type';

export interface Phone extends Base<Phone> {
  id: string;
  description: string;
  number: string;
}

export const emptyPhone = (): Phone => {
  const defaultValues = {
    id: randomString(),
    description: '',
    number: '',
  };
  return {
    ...defaultValues,
    meta: defaultValues,
  };
};
