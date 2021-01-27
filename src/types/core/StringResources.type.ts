type ApiMethodValues = {
  DELETE: string;
  GET: string;
  PATCH: string;
  POST: string;
  PUT: string;
};

export type IStringResources = {
  Success: Partial<ApiMethodValues>;
  Errors: ApiMethodValues & {
    ValidationFailed: string;
  };
};
