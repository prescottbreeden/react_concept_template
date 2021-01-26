import React, { FC } from 'react';
import { FlexColumn, FlexRow } from 'layouts';
import { idOrRandom } from 'utilities/general.utils';
import { DynamicFormProps } from 'types/core/form.type';

export const DynamicForm: FC<DynamicFormProps> = ({
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
              <button
                className="button form__btn--add"
                onClick={() => removeForm(data)}
              >
                Remove
              </button>
            </div>
          </FlexRow>
        ))}
      </FlexColumn>
      <FlexRow>
        <button onClick={() => addForm()}>+ Add New Phone</button>
      </FlexRow>
    </>
  );
};
