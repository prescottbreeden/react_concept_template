import startCase from 'lodash.startcase';
import React, { Ref } from 'react';
import { Error, FlexColumn } from 'layouts';
import { randomString } from 'utilities/general.utils';

interface InputProps {
  disabled?: boolean;
  error?: string;
  errorClass?: string;
  id?: string;
  inputClass?: string;
  label?: boolean;
  labelClass?: string;
  name: string;
  onBlur?: (event: any) => any;
  onChange?: (event: any) => any;
  ref?: Ref<any>;
  tooltip?: JSX.Element;
  type?: 'text' | 'number';
  value: any;
}
export const Input: React.FC<InputProps> = (props) => {
  const {
    error = '',
    errorClass = 'form__input--error',
    id,
    inputClass = 'form__input',
    labelClass = 'form__label',
    label = true,
    name,
    onBlur = (_: any) => null,
    onChange = (_: any) => null,
    ref,
    tooltip,
    type = 'text',
    value,
  } = props;

  // --[ component logic ]-----------------------------------------------------

  // --[ render logic ]--------------------------------------------------------
  const evaluatedInputClassName =
    error.length > 0 ? `${inputClass} ${errorClass}` : inputClass;
  const uniqueHash = randomString();

  return (
    <FlexColumn>
      {label && (
        <label htmlFor={id ?? uniqueHash} className={labelClass}>
          {startCase(name)}
          {tooltip && tooltip}
        </label>
      )}
      <input
        className={evaluatedInputClassName}
        id={id ?? uniqueHash}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        type={type}
        value={value}
      />
      {error && <Error>{error}</Error>}
    </FlexColumn>
  );
};
