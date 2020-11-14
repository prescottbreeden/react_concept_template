import React, { FC, useState } from 'react';
import { Button } from '@material-ui/core';
import { all } from 'de-formed-validations';
import { PhoneForm } from 'forms/Contact.form';
import { map } from 'ramda';
import { compose } from 'redux';
import { Phone } from 'types/feature/contact.type';
import { PhoneValidation } from 'validations/phone.validation';
import { upsert } from 'utils/utilities';
import { useDispatch } from 'react-redux';
import { setNotification } from 'redux/reducers/core/notifications.reducer';

interface CreateContactProps {}
export const CreateContact: FC<CreateContactProps> = (props) => {
  const dispatch = useDispatch();
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const [phones, setCreateContact] = useState<Phone[]>([
    { id: '1', description: 'description', number: '' },
    { id: '2', description: 'description', number: '' },
    { id: '3', description: 'description', number: '' },
  ]);

  // -- onChange logic ---------------------------------------------------------
  const v = PhoneValidation();
  const onChange = compose(setCreateContact, upsert(phones));
  const allValid = compose(all, map(v.validateAll));

  const handleSave = () => {
    if (allValid(phones)) {
      dispatch(
        setNotification({ status: 'success', message: 'Form is valid.' })
      );
      setCanSubmit(true);
    } else {
      dispatch(
        setNotification({ status: 'error', message: 'Form is not valid.' })
      );
      setCanSubmit(false);
    }
  };

  return (
    <div className="form__group">
      {map(
        (phone: Phone) => (
          <PhoneForm
            key={phone.id}
            canSubmit={canSubmit}
            onChange={onChange}
            phone={phone}
          />
        ),
        phones
      )}
      <div className="form__row">
        <Button onClick={() => null} className="button">
          Add Phone
        </Button>
        <Button onClick={handleSave} className="button">
          Click Me to Submit
        </Button>
      </div>
      <div>
        {canSubmit ? (
          <span style={{ color: 'green' }}>All Valid</span>
        ) : (
          <span style={{ color: 'red' }}>Not All Valid</span>
        )}
      </div>
    </div>
  );
};
