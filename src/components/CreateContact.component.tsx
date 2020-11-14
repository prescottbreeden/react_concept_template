import React, { FC, useState } from 'react';
import { Button } from '@material-ui/core';
import { all } from 'de-formed-validations';
import { PhoneForm } from 'forms/Contact.form';
import { map } from 'ramda';
import { compose } from 'redux';
import { Phone } from 'types/feature/contact.type';
import { PhoneValidation } from 'validations/phone.validation';

interface CreateContactProps {}
export const CreateContact: FC<CreateContactProps> = (props) => {
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const [phones, setCreateContact] = useState<Phone[]>([
    { id: '1', description: 'description', number: '' },
    { id: '2', description: 'description', number: '' },
    { id: '3', description: 'description', number: '' },
  ]);

  // upsert :: [a] -> b -> [a]
  const upsert = (list: Phone[]) => (b: Phone) => {
    return list.map((a: Phone) => (a.id === b.id ? b : a));
  };

  // -- onChange logic ---------------------------------------------------------
  const onChange = compose(setCreateContact, upsert(phones));

  const v = PhoneValidation();
  const allValid = compose(setCanSubmit, all, map(v.validateAll));

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
        <Button onClick={() => allValid(phones)} className="button">
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
