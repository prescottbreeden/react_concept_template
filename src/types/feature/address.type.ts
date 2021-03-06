import { Base } from './base.type';

export interface Address extends Base<Address> {
  city: string;
  state: string;
  street1: string;
  street2: string;
  zipCode: string;
}

export const emptyAddress = (): Address => {
  const defaultValues: Address = {
    city: '',
    state: '',
    street1: '',
    street2: '',
    zipCode: '',
  };

  return {
    ...defaultValues,
    meta: defaultValues,
  };
};
