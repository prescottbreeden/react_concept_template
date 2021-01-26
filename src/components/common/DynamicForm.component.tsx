import React, { FC } from 'react';
import { FlexColumn, FlexRow } from 'layouts';
import { idOrRandom } from 'utilities/general.utils';
import { DynamicFormProps } from 'types/core/form.type';
import { map, maybe } from 'fp-tools';

export const DynamicForm: FC<DynamicFormProps> = ({
  addForm,
  form,
  items,
  onChange,
  removeForm,
  resetValidation,
  submitFailed,
}) => {
  // --[ render logic ]--------------------------------------------------------
  const renderItems = map((data: any) => (
    <FlexRow key={idOrRandom(data)}>
      {React.createElement(form, {
        data,
        onChange,
        resetValidation,
        submitFailed,
      })}
      <div className="u-relative">
        <button onClick={() => removeForm(data)}>Remove</button>
      </div>
    </FlexRow>
  ));

  return (
    <>
      <FlexColumn>{maybe(items).map(renderItems).join()}</FlexColumn>
      <FlexRow>
        <button onClick={() => addForm()}>+ Add New Phone</button>
      </FlexRow>
    </>
  );
};
