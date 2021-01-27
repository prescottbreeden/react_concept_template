import React from 'react';
import { DevTools } from 'utilities/DevTools';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { StarWarsPage } from 'pages/examples/Starwars.page';
import { UserPage } from 'pages/examples/User.page';
import { HomePage } from 'pages/Home.page';

function App() {
  return (
    <>
      <Router>
        <div className="header">
          <h1>Amplify Consulting Partners React Template</h1>
        </div>
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/starwars">API Examples</Link>
          <Link to="/users">User</Link>
        </nav>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/starwars" component={StarWarsPage} />
          <Route exact path="/users" component={UserPage} />
        </Switch>
        <DevTools />
      </Router>
    </>
  );
}

export default App;
