import React, { FC } from 'react';
import { CircularProgress } from '@material-ui/core';
import { getLoader } from 'redux/selectors/core/loader.selectors';
import { useSelector } from 'react-redux';

export const Loading: FC = () => {
  const loader: [] = useSelector(getLoader);
  const percentage = Math.floor(100 / (loader.length + 1));

  return loader.length > 0 ? (
    <div className="loading">
      <div className="loading__content">
        <p>LOADING</p>
        <CircularProgress />
        <p>{percentage}%</p>
      </div>
    </div>
  ) : null;
};
