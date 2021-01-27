import { IStringResources } from 'types/core/StringResources.type';

export const StringResources: IStringResources = {
  Success: {
    DELETE: 'The record was successfully deleted',
    PATCH: 'Your changes were saved successfully.',
    POST: 'Your changes were saved successfully.',
    PUT: 'Your changes were saved successfully.',
  },
  Errors: {
    DELETE: 'The record was unable to be deleted',
    GET: 'There was an error loading the data.',
    PATCH: 'There was an error saving your changes, please try again later.',
    POST: 'There was an error saving your changes, please try again later.',
    PUT: 'There was an error saving your changes, please try again later.',
    ValidationFailed:
      'All validations did not pass. Please check the page for errors.',
  },
};
