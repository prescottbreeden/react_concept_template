import React from 'react';
import { Person } from 'types';
import { depthSearch } from '../utils/utilities';

interface DataStateProps {
  state: Person;
}
export const DataState: React.FC<DataStateProps> = ({ state }) => {
  return (
    <div className="json">
      <h2>Original Data of Selected</h2>
      {state.meta ? (
        <pre>{JSON.stringify(state.meta, null, 2)}</pre>
      ) : (
        <p>Select a Person to see api data.</p>
      )}
      <br />
      <h2>Edited Data of Selected</h2>
      {state.personId !== -1 && (
        <pre>{JSON.stringify(depthSearch(state), null, 2)}</pre>
      )}
    </div>
  );
};
