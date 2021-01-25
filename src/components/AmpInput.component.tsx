import React from 'react';
import startCase from 'lodash.startcase';
import { Error, FlexColumn, Input, Label } from 'layouts';
import { doNothing } from 'fp-tools';

interface AmpInputProps {
  getError?: (x: any) => string;
  name: string;
  onBlur: (event: any) => any;
  onChange: (event: any) => any;
  value: any;
}
export const AmpInput: React.FC<AmpInputProps> = ({
  getError = doNothing,
  name,
  onBlur,
  onChange,
  value,
}) => {
  return (
    <>
      <FlexColumn>
        <Label htmlFor={name}>{startCase(name)}</Label>
        <Input
          id={name}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
        />
        {getError(name) && <Error>{getError(name)}</Error>}
      </FlexColumn>
    </>
  );
};
