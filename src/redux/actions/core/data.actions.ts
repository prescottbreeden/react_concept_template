import { ApiResponse } from 'types';

const DATA_NORMALIZED = 'DATA_NORMALIZED';

export const dataNormalized = ({ feature }: ApiResponse) => {
  return {
    type: `${feature} ${DATA_NORMALIZED}`,
    meta: { feature },
  };
};
