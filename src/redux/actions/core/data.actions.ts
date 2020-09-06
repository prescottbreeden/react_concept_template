const DATA_NORMALIZED = 'DATA_NORMALIZED';

export const dataNormalized = ({ feature }: any) => {
  return {
    type: `${feature} ${DATA_NORMALIZED}`,
    meta: { feature },
  };
};
