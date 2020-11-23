import React from 'react';
import { equals, isNil, prop } from 'ramda';
import { Person } from 'types/feature/person.type';
import { compose, depthSearch } from 'utilities/general.utils';

interface DataStateProps {
  state: Person;
}
export const DataState: React.FC<DataStateProps> = ({ state }) => {
  // -- helpers ----------------------------------------------------------------
  const metaIsNil = compose(isNil, prop('meta'));
  const newPerson = compose(equals(-1), prop('personId'));

  // -- display logic ----------------------------------------------------------
  const showMeta = metaIsNil(state) ? (
    <p>Select a Person to see api data.</p>
  ) : (
    <pre>{JSON.stringify(state.meta, null, 2)}</pre>
  );

  const showEditedData = !newPerson(state) && (
    <pre>{JSON.stringify(depthSearch(state), null, 2)}</pre>
  );

  return (
    <div className="json">
      <h2>Original Data of Selected</h2>
      {showMeta}
      <br />
      <h2>Edited Data of Selected</h2>
      {showEditedData}
    </div>
  );
};
