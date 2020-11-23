export type Base<T> = {
  modifiedBy: number;
  createdAt: Date;
  updatedAt: Date;
  meta?: T;
};

export function emptyBase<T>(): Base<T> {
  return {
    modifiedBy: -1,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };
}
