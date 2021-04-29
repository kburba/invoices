import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import InvoiceForm from './containers/invoices/InvoiceForm';
import InvoiceForm from './containers/invoices/InvoiceForm';
import Invoices from './containers/invoices/Invoices';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/invoices/edit/:invoiceId" component={InvoiceForm} />
        <Route path="/invoices/new" component={InvoiceForm} />
        <Route path="/invoices" component={Invoices} />
        <Route
          path="/"
          component={() => <Link to="/invoices">Invoices</Link>}
          exact
        />
        <Route component={() => <div>Error 404: Route not found</div>} />
      </Switch>
    </Router>
  );
}

export default App;
