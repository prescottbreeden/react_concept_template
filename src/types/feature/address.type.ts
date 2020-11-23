export type Address = {
  city: string;
  state: string;
  street1: string;
  street2: string;
  zipCode: string;
};

export const emptyAddress = (): Address => {
  return {
    city: '',
    state: '',
    street1: '',
    street2: '',
    zipCode: '',
  };
};
