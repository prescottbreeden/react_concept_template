import React, { FC } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectLoader } from 'redux/reducers/core/loader.reducer';
import { add, divide, prop } from 'ramda';
import { compose } from 'utilities/general.utils';

export const Loading: FC = () => {
  // --[ component logic ]-----------------------------------------------------
  const percentComplete = compose(
    Math.floor,
    divide(100),
    add(1),
    prop('length')
  );

  // --[ local state ]---------------------------------------------------------
  const loader: [] = useSelector(selectLoader);

  // --[ render logic ]--------------------------------------------------------
  return loader.length > 0 ? (
    <div className="loading">
      <div className="loading__content">
        <p>LOADING</p>
        <CircularProgress />
        <p>{percentComplete(loader)}%</p>
      </div>
    </div>
  ) : null;
};
