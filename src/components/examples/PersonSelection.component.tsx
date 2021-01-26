import { map, maybe, prop } from 'fp-tools';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectPersons } from 'redux/reducers/feature/person.reducer';
import { randomString } from 'utilities/general.utils';
import { Person } from 'types/feature/person.type';
import { FlexRow } from 'layouts';

interface PersonSelectionProps {
  setState: Function;
}
export const PersonSelection: FC<PersonSelectionProps> = ({ setState }) => {
  // --[ local state ]---------------------------------------------------------
  const people: Person[] = useSelector(selectPersons);

  // --[ render logic ]--------------------------------------------------------
  const renderPeople = map((person: Person) => (
    <li
      key={randomString()}
      className="list__item"
      onClick={() => setState(person)}
    >
      <p>{prop('name', person)}</p>
    </li>
  ));

  return (
    <div className="list__container">
      <FlexRow>
        <h2>Select a Person</h2>
      </FlexRow>
      <ul>{maybe(people).map(renderPeople).join()}</ul>
    </div>
  );
};
