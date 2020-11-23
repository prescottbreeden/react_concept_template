import React, { FC, useState } from 'react';
import { mergeDeepRight } from 'ramda';
import { UserValidation } from 'validations/user.validation';
import { Button, FlexColumn, FlexRow } from 'layouts';
import { UserForm } from 'forms/User.form';
import { User, emptyUser } from 'types/feature/user.type';
import { compose } from 'utilities/general.utils';

export const CreateUser: FC = () => {
  // -- validation functions --
  const { resetValidationState, validateAll } = UserValidation();

  // -- local states --
  const [submitFailed, setSubmitFailed] = useState<boolean>(false);
  const [resetValidation, setResetValidation] = useState<boolean>(false);
  const [contact, setUser] = useState<User>(emptyUser());

  // -- component logic --
  const onChange = compose(setUser, mergeDeepRight(contact));

  const handleSave = () => {
    if (validateAll(contact)) {
      setSubmitFailed(false);
      alert('Validations all passed!');
      // do the save-y bits
    } else {
      setSubmitFailed(true);
      // do the oops-y bits
    }
  };

  const handleReset = () => {
    setSubmitFailed(false);
    setResetValidation(!resetValidation);
    setUser(emptyUser());
    resetValidationState();
  };

  return (
    <>
      <FlexRow>
        <FlexColumn>
          <UserForm
            data={contact}
            onChange={onChange}
            resetValidation={resetValidation}
            submitFailed={submitFailed}
          />
        </FlexColumn>
      </FlexRow>
      <FlexRow>
        <FlexColumn>
          <Button onClick={handleSave}>Submit</Button>
        </FlexColumn>
        <FlexColumn>
          <Button onClick={handleReset}>Reset Form</Button>
        </FlexColumn>
      </FlexRow>
    </>
  );
};
