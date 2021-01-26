import { randomString } from 'utilities/general.utils';
import { Base } from './base.type';

export interface Phone extends Base<Phone> {
  id: string;
  description: string;
  number: string;
}

const defaultValues = {
  id: randomString(),
  description: '',
  number: '',
};

export const emptyPhone = (): Phone => ({
  ...defaultValues,
  meta: defaultValues,
});
