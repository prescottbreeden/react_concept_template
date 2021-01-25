import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { map, prop } from 'ramda';
import { useSelector } from 'react-redux';
import { selectPersons } from 'redux/reducers/feature/person.reducer';
import { randomString } from 'utilities/general.utils';
import { Person } from 'types/feature/person.type';
import { FlexRow } from 'layouts';
import { maybe } from 'fp-tools';

interface PersonSelectionProps {
  setState: Function;
}
export const PersonSelection: React.FC<PersonSelectionProps> = ({
  setState,
}) => {
  // --[ local state ]---------------------------------------------------------
  const people: Person[] = useSelector(selectPersons);

  // --[ render logic ]--------------------------------------------------------
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
      <FlexRow>
        <h2>Select a Person</h2>
      </FlexRow>
      <List>{maybe(people).map(renderPeople).join()}</List>
    </div>
  );
};
