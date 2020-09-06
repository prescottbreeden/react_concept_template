import React, {useState, useEffect } from 'react';
import { mergeDeepRight, map } from 'ramda';
import { Button, Input, InputLabel, List, ListItem, ListItemText } from '@material-ui/core';
import { Person, emptyPerson } from './types';
import { depthSearch, handleChange, compose, randomString } from './utilities';
import {useSelector, useDispatch} from 'react-redux';
import {getPersons} from 'redux/selectors/person.selectors';
import {fetchPerson} from 'redux/actions/person.actions';
import {Page} from 'layout/basic.layout';
import {setNotification} from 'redux/actions/notification.actions';

function App() {
  // -- redux and state ------------------------
  const dispatch = useDispatch();
  const people: Person[] = useSelector(getPersons);
  const [state, setState] = useState<Person>(emptyPerson());

  // -- onChange logic -------------------------
  const updatePerson = compose(
    setState,
    mergeDeepRight(state),
  );
  const onChange = handleChange(updatePerson);

  // -- display logic --------------------------
  const renderPeople = map((person: Person) => (
    <ListItem 
      key={randomString()}
      className="list__item"
      onClick={() => setState(person)}
    >
      <ListItemText
        primary={person.name}
      />
    </ListItem>
  ));

  // -- save/load ------------------------------
  const savePerson = () => {
    dispatch(setNotification({
      status: "success",
      message: "Save successful",
    }));
  };
  useEffect(() => {
    dispatch(fetchPerson({}));
  }, [dispatch]);

  return (
    <Page>
      <div className="container">
        <div className="json">
          <h2>Original Data of Selected</h2>
          {state.meta ? (
            <pre>{JSON.stringify(state.meta, null, 2)}</pre>
          ) : (
          <p>Select a Person to see api data.</p>
          )}
          <br />
          <h2>Edited Data of Selected</h2>
          {state.personId !== -1 &&
            <pre>
              {JSON.stringify(depthSearch(state), null, 2)}
            </pre>
          }
        </div>
        <div className="elements">
          <div className="form__container">
            <h2>Form Sample</h2>
            <br />
            <p>
              Select a Person on the right to load their data and then change 
              their data to see what the payload to the API would be.
            </p>
            <div className="form">
              <div className="form__row">
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input 
                  id="name"
                  name="name"
                  onChange={onChange('name')}
                  value={state.name}
                />
              </div>
              <div className="form__row">
                <InputLabel htmlFor="height">Height</InputLabel>
                <Input 
                  id="height"
                  name="height"
                  onChange={onChange('height')}
                  value={state.height}
                />
              </div>
              <div className="form__row">
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Input 
                  id="gender"
                  name="gender"
                  onChange={onChange('gender')}
                  value={state.gender}
                />
              </div>
              <Button 
                onClick={savePerson}
                className="button"
              >
                Click Me to Submit
              </Button>
            </div>
          </div>
          <div className="list__container">
              <h2>Select a Person</h2>
             <List>
               {renderPeople(people)}
            </List>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default App;
