import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PersonSelection } from 'components/PersonSelection.component';
import { DataState } from 'components/DataState.component';
import { readPerson } from 'services/person.service';
import { mergeDeepRight } from 'ramda';
import { PersonForm } from 'forms/Person.form';
import { emptyPerson, Person } from 'types/feature/person.type';
import { compose } from 'utilities/general.utils';
import { BaseLayout } from 'layouts/BaseLayout.layout';
import { PersonValidation } from 'validations/person.validation';
import { setNotification } from 'redux/reducers/core/notifications.reducer';
import { FlexRow, Paper } from 'layouts';
import { Button } from '@material-ui/core';

export const EditPerson: React.FC = () => {
  // --[ dependencies ]--------------------------------------------------------
  const dispatch = useDispatch();
  const { resetValidationState, validateAll } = PersonValidation();

  // --[ local state ]---------------------------------------------------------
  const [person, setPerson] = useState<Person>(emptyPerson());
  const [submitFailed, setSubmitFailed] = useState<boolean>(false);
  const [resetValidation, setResetValidation] = useState<boolean>(false);

  // --[ component logic ]-----------------------------------------------------
  const onChange = compose(setPerson, mergeDeepRight(person));

  const handleSave = () => {
    if (validateAll(person)) {
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
      dispatch(
        setNotification({
          status: 'error',
          message: 'Not all validations passed.',
        })
      );
      // do the oops-y bits
    }
  };

  const handleReset = () => {
    setSubmitFailed(false);
    setResetValidation(!resetValidation);
    setPerson(emptyPerson());
    resetValidationState();
  };

  // --[ lifecycle ]-----------------------------------------------------------
  useEffect(() => {
    dispatch(readPerson());
  }, [dispatch]);

  // --[ render logic ]--------------------------------------------------------

  return (
    <>
      <BaseLayout>
        <div style={{ display: 'flex' }}>
          <Paper>
            <DataState state={person} />
          </Paper>
          <Paper>
            <PersonForm
              onChange={onChange}
              data={person}
              resetValidation={resetValidation}
              submitFailed={submitFailed}
            />
            <FlexRow>
              <Button color="primary" onClick={handleSave} size="large">
                Submit
              </Button>
              <Button color="secondary" onClick={handleReset} size="large">
                Reset Form
              </Button>
            </FlexRow>
          </Paper>
          <Paper>
            <PersonSelection setState={setPerson} />
          </Paper>
        </div>
      </BaseLayout>
    </>
  );
};
