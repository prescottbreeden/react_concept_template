import { ButtonBase, InputLabel } from '@material-ui/core';
import React from 'react';
export * from './Input.layout';

export const Button: React.FC<any> = (props) => {
  return <ButtonBase {...props}>{props.children}</ButtonBase>;
};

export const IconButton: React.FC<any> = (props) => {
  return <IconButton {...props}>{props.children}</IconButton>;
};

export const Error: React.FC<any> = (props) => {
  return (
    <p className="error" {...props}>
      {props.children}
    </p>
  );
};

export const FlexColumn: React.FC<any> = (props) => {
  return (
    <div className="flex__column" {...props}>
      {props.children}
    </div>
  );
};

export const FlexRow: React.FC<any> = (props) => {
  return (
    <div className="flex__row" {...props}>
      {props.children}
    </div>
  );
};

export const Label: React.FC<any> = (props) => {
  return <InputLabel {...props}>{props.children}</InputLabel>;
};

export const Paper: React.FC<any> = (props) => {
  return (
    <div className="paper" {...props}>
      {props.children}
    </div>
  );
};
