import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/new">
          <div>New</div>
        </Route>
        <Route path="/edit">
          <div>Edit</div>
        </Route>
        <Route path="/">
          <h1>Invoices</h1>
          <Link to="/new">Create Invoice</Link>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
