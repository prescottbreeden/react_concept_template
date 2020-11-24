import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DataSelection } from 'components/DataSelection.component';
import { DataState } from 'components/DataState.component';
import { DevTools } from 'components/DevTools';
import { readPerson } from 'services/person.service';
import { mergeDeepRight } from 'ramda';
import { PersonForm } from 'forms/Person.form';
import { emptyPerson, Person } from 'types/feature/person.type';
import { compose } from 'utilities/general.utils';
import { BaseLayout } from 'layouts/BaseLayout.layout';
import { PersonValidation } from 'validations/person.validation';
import { setNotification } from 'redux/reducers/core/notifications.reducer';
import { FlexColumn, FlexRow } from 'layouts';
import { Button } from '@material-ui/core';

export const EditPerson: React.FC = () => {
  // -- dependendencies --
  const dispatch = useDispatch();
  const { resetValidationState, validateAll } = PersonValidation();
  const [person, setPerson] = useState<Person>(emptyPerson());
  const [submitFailed, setSubmitFailed] = useState<boolean>(false);
  const [resetValidation, setResetValidation] = useState<boolean>(false);

  // -- component logic --
  const onChange = compose(setPerson, mergeDeepRight(person));

  const handleSave = () => {
    if (validateAll(person)) {
      dispatch(
        setNotification({
          status: 'success',
          message: 'Save successful',
        })
      );
      setSubmitFailed(false);
      alert('Validations all passed!');
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
    setPerson(emptyPerson());
    resetValidationState();
  };

  // -- lifecycle --
  useEffect(() => {
    dispatch(readPerson());
  }, [dispatch]);

  return (
    <>
      <BaseLayout>
        <div className="container">
          <DataState state={person} />
          <div className="elements">
            <FlexColumn>
              <PersonForm
                onChange={onChange}
                data={person}
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
            </FlexColumn>
            <DataSelection setState={setPerson} />
            <DevTools />
          </div>
        </div>
      </BaseLayout>
    </>
  );
};
