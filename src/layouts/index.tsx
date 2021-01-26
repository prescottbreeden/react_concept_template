import React from 'react';

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

export const Paper: React.FC<any> = (props) => {
  return (
    <div className="paper" {...props}>
      {props.children}
    </div>
  );
};
