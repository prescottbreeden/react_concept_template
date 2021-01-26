import { FC, useEffect } from 'react';
import { DynamicForm } from 'components/common/DynamicForm.component';
import { FlexRow } from 'layouts';
import { UserValidation } from 'validations/examples/user.validation';
import { PhoneForm } from 'forms/examples/Phone.form';
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
import { AddressForm } from './Address.form';
import { Input } from 'components/common/Input.component';

export const UserForm: FC<FormType<User>> = ({
  data,
  onChange,
  resetValidation,
  submitFailed,
}) => {
  // --[ dependencies ]--------------------------------------------------------
  const {
    getError,
    resetValidationState,
    validateAll,
    validateOnBlur,
    validateOnChange,
  } = UserValidation();

  // --[ component logic ]-----------------------------------------------------
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
  const handleAddressChange = compose(onChange, set('address'));
  // get :: string -> User[string]
  const get = safeGet(data);

  // --[ lifecycle ]-----------------------------------------------------------
  useEffect(() => {
    submitFailed && validateAll(data);
  }, [submitFailed, data]); //eslint-disable-line

  useEffect(() => {
    resetValidationState();
  }, [resetValidation]); //eslint-disable-line

  // --[ render logic ]--------------------------------------------------------

  return (
    <>
      <FlexRow>
        <Input
          error={getError('firstName')}
          name="firstName"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('firstName')}
        />
        <Input
          error={getError('lastName')}
          name="lastName"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          value={get('lastName')}
        />
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
      <AddressForm
        data={get('address')}
        onChange={handleAddressChange}
        resetValidation={resetValidation}
        submitFailed={submitFailed}
      />
    </>
  );
};
