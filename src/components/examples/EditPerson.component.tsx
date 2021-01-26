import React, { useState, useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { PersonSelection } from 'components/examples/PersonSelection.component';
import { DataState } from 'components/examples/DataState.component';
import { readPerson } from 'services/person.service';
import { mergeDeepRight } from 'ramda';
import { PersonForm } from 'forms/examples/Person.form';
import { emptyPerson, Person } from 'types/feature/person.type';
import { compose } from 'utilities/general.utils';
import { PersonValidation } from 'validations/examples/person.validation';
import { setNotification } from 'redux/reducers/core/notifications.reducer';
import { FlexRow, Paper } from 'layouts';

export const EditPerson: FC = () => {
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
            <button onClick={handleSave}>Submit</button>
            <button onClick={handleReset}>Reset Form</button>
          </FlexRow>
        </Paper>
        <Paper>
          <PersonSelection setState={setPerson} />
        </Paper>
      </div>
    </>
  );
};
