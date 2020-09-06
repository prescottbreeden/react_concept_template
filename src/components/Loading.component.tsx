import React, {FC} from 'react';
import {CircularProgress} from '@material-ui/core';

export const Loading: FC = () => {
  return (
    <div className="loading">
      <div className="loading__content">
        <p>Loading</p>
        <CircularProgress />
      </div>
    </div>
  );
}
