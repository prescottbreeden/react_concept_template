import React, { FC } from 'react';
import { compose, depthSearch } from 'utilities/general.utils';
import { equals, objProp, prop, isNil } from 'fp-tools';

interface DataStateProps {
  state: any;
}
export const DataState: FC<DataStateProps> = ({ state }) => {
  // --[ component logic ]-----------------------------------------------------
  const metaIsNil = compose(isNil, prop('meta'));
  const newPerson = compose(equals(-1), prop('id'));
  const get = objProp(state);

  // --[ render logic ]--------------------------------------------------------
  const showMeta = metaIsNil(state) ? (
    <p>Select a Person to see api data.</p>
  ) : (
    <pre>{JSON.stringify(get('meta'), null, 2)}</pre>
  );

  const showEditedData = !newPerson(state) && (
    <pre>{JSON.stringify(depthSearch(state), null, 2)}</pre>
  );

  return (
    <>
      <div className="json">
        <h2>Original Data of Selected</h2>
        {showMeta}
        <br />
        <h2>Edited Data of Selected</h2>
        {showEditedData}
      </div>
    </>
  );
};
