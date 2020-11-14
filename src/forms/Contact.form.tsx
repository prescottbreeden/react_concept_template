import React, { useEffect } from 'react';
import { mergeDeepRight } from 'ramda';
import { compose, handleChange } from 'utils/utilities';
import { Phone } from 'types/feature/contact.type';
import { PhoneValidation } from 'validations/phone.validation';

interface PhoneFormProps {
  canSubmit: boolean;
  onChange: Function;
  phone: Phone;
}
export const PhoneForm: React.FC<PhoneFormProps> = ({
  canSubmit,
  onChange,
  phone,
}) => {
  // -- onChange logic ---------------------------------------------------------
  const v = PhoneValidation();
  const onPhoneChange = compose(onChange, mergeDeepRight(phone), handleChange);
  const change = v.validateOnChange(onPhoneChange, phone);
  const blur = v.validateOnBlur(phone);

  // -- display logic ----------------------------------------------------------
  const error = (prop: keyof Phone) =>
    v.getError(prop) ? (
      <p style={{ color: 'red' }}>{v.getError(prop)}</p>
    ) : null;

  // -- lifecycle --------------------------------------------------------------
  useEffect(() => {
    !canSubmit && v.validateAll(phone);
  }, [canSubmit, phone]); //eslint-disable-line

  return (
    <div className="form__row">
      <div className="form__group">
        <label htmlFor="">Number</label>
        <input
          name="number"
          onBlur={blur}
          onChange={change}
          value={phone.number}
        />
        {error('number')}
      </div>
      <div className="form__group">
        <label htmlFor="">Description</label>
        <input
          name="description"
          onBlur={blur}
          onChange={change}
          value={phone.description}
        />
        {error('description')}
      </div>
    </div>
  );
};
