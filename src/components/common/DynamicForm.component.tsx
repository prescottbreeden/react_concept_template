import React, { FC } from 'react';
import { FlexColumn, FlexRow } from 'layouts';
import { DynamicFormProps } from 'types/core/form.type';
import { map, maybe } from 'fp-tools';
import { idOrRandom } from 'utilities/general.utils';

export const DynamicForm: FC<DynamicFormProps> = ({
  addForm,
  form,
  items,
  onChange,
  primaryKey = 'id',
  removeForm,
  resetValidation,
  submitFailed,
}) => {
  // --[ render logic ]--------------------------------------------------------
  const renderItems = map((data: any) => (
    <FlexRow key={idOrRandom(primaryKey)(data)}>
      {React.createElement(form, {
        data,
        onChange,
        resetValidation,
        submitFailed,
      })}
      <div style={{ position: 'relative', alignSelf: 'flex-end' }}>
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
