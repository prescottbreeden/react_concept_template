import { useValidation } from 'de-formed-validations';
import { Person } from 'types/feature/person.type';

export const PersonValidation = () => {
  return useValidation<Person>({
    name: [
      {
        errorMessage: 'Name is required.',
        validation: (val: string, person: Person) => {
          return person && val.trim().length > 0;
        },
      },
    ],
    height: [
      {
        errorMessage: 'Height is required.',
        validation: (val: string, _) => val.trim().length > 0,
      },
    ],
    gender: [
      {
        errorMessage: 'Gender is required.',
        validation: (val: string, _) => val.trim().length > 0,
      },
    ],
  });
};
