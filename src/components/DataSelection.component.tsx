import React from 'react';
import { Person } from 'types';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { map, prop } from 'ramda';
import { useSelector } from 'react-redux';
import { selectPersons } from 'redux/reducers/feature/person.reducer';
import { randomString } from 'utils/utilities';

interface DataSelectionProps {
  setState: Function;
}
export const DataSelection: React.FC<DataSelectionProps> = ({ setState }) => {
  // -- redux and state --------------------------------------------------------
  const people: Person[] = useSelector(selectPersons);

  // -- display logic ----------------------------------------------------------
  const renderPeople = map((person: Person) => (
    <ListItem
      key={randomString()}
      className="list__item"
      onClick={() => setState(person)}
    >
      <ListItemText primary={prop('name', person)} />
    </ListItem>
  ));

  return (
    <div className="list__container">
      <h2>Select a Person</h2>
      <br />
      <p>Use Ctrl-H to bring up redux dev tools</p>
      <br />
      <List>{renderPeople(people)}</List>
    </div>
  );
};
