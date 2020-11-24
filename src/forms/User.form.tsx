import React, { useEffect } from 'react';
import { DynamicForm } from 'components/DynamicForm.component';
import { Error, FlexColumn, FlexRow, Input, Label } from 'layouts';
import { UserValidation } from 'validations/user.validation';
import { PhoneForm } from 'forms/Phone.form';
import { FormType } from 'types/core/form.type';
import { User } from 'types/feature/user.type';
import { emptyPhone, Phone } from 'types/feature/phone.type';
import {
  compose,
  handleChangeEvent,
  replaceItem,
  safeGet,
  set,
} from 'utilities/general.utils';

export const UserForm: React.FC<FormType<User>> = ({
  data,
  onChange,
  resetValidation,
  submitFailed,
}) => {
  // -- validation functions --
  const {
    getError,
    resetValidationState,
    validateAll,
    validateOnBlur,
    validateOnChange,
  } = UserValidation();

  // -- component logic --
  const handleOnBlur = validateOnBlur(data);
  const handleOnChange = validateOnChange(
    compose(onChange, handleChangeEvent),
    data
  );
  const handlePhoneChange = compose(
    onChange,
    set('phones'),
    replaceItem(data.phones)
  );
  const addNewPhone = () => {
    const phones = [...data.phones, emptyPhone()];
    onChange({ phones });
  };
  const deletePhone = (p1: Phone) => {
    const phones = data.phones.filter((p2: Phone) => {
      return p1.id !== p2.id;
    });
    return onChange({ phones });
  };

  // -- lifecycle --
  useEffect(() => {
    submitFailed && validateAll(data);
  }, [submitFailed, data]); //eslint-disable-line

  useEffect(() => {
    resetValidationState();
  }, [resetValidation]); //eslint-disable-line

  // -- render logic --
  const get = safeGet(data);

  return (
    <>
      <FlexRow>
        <FlexColumn>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            value={get('firstName')}
          />
          {getError('firstName') && <Error>{getError('firstName')}</Error>}
        </FlexColumn>
        <FlexColumn>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            value={get('lastName')}
          />
          {getError('lastName') && <Error>{getError('lastName')}</Error>}
        </FlexColumn>
      </FlexRow>
      <DynamicForm
        addForm={addNewPhone}
        form={PhoneForm}
        items={get('phones')}
        onChange={handlePhoneChange}
        removeForm={deletePhone}
        resetValidation={resetValidation}
        submitFailed={submitFailed}
      />
    </>
  );
};
