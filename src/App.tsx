import React from 'react';
import { EditPerson } from 'components/EditPerson.component';
import { DevTools } from 'utilities/DevTools';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { CreateUser } from 'components/CreateContact.component';

function App() {
  return (
    <>
      <Router>
        <div className="header">
          <h1>React Boiler Template</h1>
        </div>
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/starwars">API Examples</Link>
          <Link to="/users">User</Link>
        </nav>

        <Switch>
          <Route path="/starwars">
            <EditPerson />
          </Route>
          <Route path="/users">
            <CreateUser />
          </Route>
          <Route path="/">
            <p>dingo</p>
          </Route>
        </Switch>
        <DevTools />
      </Router>
    </>
  );
}

export default App;
