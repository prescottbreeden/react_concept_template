import React from 'react';
import { FlexColumn, FlexRow } from 'layouts';
import { idOrRandom } from 'utilities/general.utils';
import { DynamicFormProps } from 'types/core/form.type';
import Button from '@material-ui/core/Button';

export const DynamicForm: React.FC<DynamicFormProps> = ({
  addForm,
  form,
  items,
  onChange,
  removeForm,
  resetValidation,
  submitFailed,
}) => {
  return (
    <>
      <FlexColumn>
        {items.map((data: any) => (
          <FlexRow key={idOrRandom(data)}>
            {React.createElement(form, {
              data,
              onChange,
              resetValidation,
              submitFailed,
            })}
            <div className="u-relative">
              <Button
                className="button form__btn--add"
                onClick={() => removeForm(data)}
              >
                Remove
              </Button>
            </div>
          </FlexRow>
        ))}
      </FlexColumn>
      <FlexRow>
        <Button onClick={() => addForm()}>+ Add New Phone</Button>
      </FlexRow>
    </>
  );
};
