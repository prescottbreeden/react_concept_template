import React, { FC } from 'react';
import { CircularProgress } from '@material-ui/core';
import { getLoader } from 'redux/selectors/core/loader.selectors';
import { useSelector } from 'react-redux';

export const Loading: FC = () => {
  const loader: boolean = useSelector(getLoader);

  return loader ? (
    <div className="loading">
      <div className="loading__content">
        <p>Loading</p>
        <CircularProgress />
      </div>
    </div>
  ) : null;
};
