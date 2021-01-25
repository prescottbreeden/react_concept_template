import React, { FC, useState } from 'react';
import { mergeDeepRight } from 'ramda';
import { UserValidation } from 'validations/user.validation';
import { FlexRow, Paper } from 'layouts';
import { UserForm } from 'forms/User.form';
import { User, emptyUser } from 'types/feature/user.type';
import { compose } from 'utilities/general.utils';
import { BaseLayout } from 'layouts/BaseLayout.layout';
import { DataState } from './DataState.component';
import { PersonSelection } from './PersonSelection.component';
import { useDispatch } from 'react-redux';
import { setNotification } from 'redux/reducers/core/notifications.reducer';
import { Button } from '@material-ui/core';

export const CreateUser: FC = () => {
  // --[ dependencies ]--------------------------------------------------------
  const dispatch = useDispatch();
  const { resetValidationState, validateAll } = UserValidation();

  // --[ local state ]---------------------------------------------------------
  const [submitFailed, setSubmitFailed] = useState<boolean>(false);
  const [resetValidation, setResetValidation] = useState<boolean>(false);
  const [user, setUser] = useState<User>(emptyUser());

  // --[ component logic ]-----------------------------------------------------
  const onChange = compose(setUser, mergeDeepRight(user));

  const handleSave = () => {
    if (validateAll(user)) {
      setSubmitFailed(false);
      dispatch(
        setNotification({
          status: 'success',
          message: 'Save successful',
        })
      );
      // do the save-y bits
    } else {
      setSubmitFailed(true);
      setNotification({
        status: 'error',
        message: 'Not all validations passed.',
      });
      // do the oops-y bits
    }
  };

  const handleReset = () => {
    setSubmitFailed(false);
    setResetValidation(!resetValidation);
    setUser(emptyUser());
    resetValidationState();
  };

  // --[ render logic ]--------------------------------------------------------

  return (
    <>
      <BaseLayout>
        <div style={{ display: 'flex' }}>
          <Paper>
            <DataState state={user} />
          </Paper>
          <Paper>
            <UserForm
              onChange={onChange}
              data={user}
              resetValidation={resetValidation}
              submitFailed={submitFailed}
            />
            <FlexRow>
              <Button onClick={handleSave} className="button">
                Submit
              </Button>
              <Button onClick={handleReset} className="button">
                Reset Form
              </Button>
            </FlexRow>
          </Paper>
          <Paper>
            <PersonSelection setState={setUser} />
          </Paper>
        </div>
      </BaseLayout>
    </>
  );
};
