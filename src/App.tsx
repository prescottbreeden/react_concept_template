import React, {useState } from 'react';
import { mergeDeepRight, map } from 'ramda';
import { Button, Input, InputLabel, List, ListItem, ListItemText } from '@material-ui/core';
import { Person, emptyPerson } from './types';
import { depthSearch, handleChange, compose, normalizeDatum } from './utilities';
import {Loading} from 'components/Loading.component';
import {Notification} from 'components/Notification.component';
import {useSelector, useDispatch} from 'react-redux';
import {getPersons} from 'redux/selectors/person.selectors';
import {fetchPerson} from 'redux/actions/person.actions';
import {getLoader} from 'redux/selectors/loader.selectors';

const fakeData = normalizeDatum(emptyPerson());

function App() {

  const people: Person[] = useSelector(getPersons);
  const loader: boolean = useSelector(getLoader);
  const [state, setState] = useState<Person>(fakeData);

  const updatePerson = compose(
    setState,
    mergeDeepRight(state),
  );

  const onChange = handleChange(updatePerson);

  const savePerson = () => {
    const postData = depthSearch(state, ['personId', 'hairId']);
    alert(JSON.stringify(postData, null, 2))
  };

  const dispatch = useDispatch();
  const loadPeople = () => {
    dispatch(fetchPerson({}));
  };

  const renderPeople = map((person: Person) => (
    <ListItem 
      key={person.personId}
      className="list__item"
      onClick={() => null}
    >
      <ListItemText
        primary={person.name}
      />
    </ListItem>
  ));

  return (
    <div className="page">
      <Notification />
      {loader && <Loading />}
      <div className="header">
        <h1>Demo</h1>
        <Button onClick={loadPeople}>Get Data</Button>
      </div>
      <div className="container">
        <div className="json">
          <h2>GET Data</h2>
          <pre>
            {JSON.stringify(fakeData, null, 2)}
          </pre>
          <h2>POST Data</h2>
          <pre>
            {JSON.stringify(depthSearch(state, ['personId']), null, 2)}
          </pre>
        </div>
        <div className="elements">
          <div className="form__container">
            <h2>Form Sample</h2>
            <div className="form">
              <div className="form__row">
                <div>
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <Input 
                    id="name"
                    name="name"
                    onChange={onChange('name')}
                    value={state.name}
                  />
                </div>
                <div>
                  <InputLabel htmlFor="height">Height</InputLabel>
                  <Input 
                    id="height"
                    name="height"
                    onChange={onChange('height')}
                    value={state.height}
                  />
                </div>
                <div>
                  <InputLabel htmlFor="gender">Gender</InputLabel>
                  <Input 
                    id="gender"
                    name="gender"
                    onChange={onChange('gender')}
                    value={state.gender}
                  />
                </div>
                <Button onClick={savePerson}>Submit</Button>
              </div>
            </div>
          </div>
          <div className="list__container">
              <h2>List of Persons in Redux</h2>
             <List>
               {renderPeople(people.length ? people : [])}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
