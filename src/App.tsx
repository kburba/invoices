import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NewInvoiceForm from './containers/invoices/InvoiceForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/invoices/new" component={NewInvoiceForm} />
        <Route path="/invoices/edit/:invoiceId" component={NewInvoiceForm} />
        <Route path="/invoices">
          <h1>Invoices</h1>
          <Link to="/invoices/new">Create Invoice</Link>
        </Route>
        <Route path="/">
          <Link to="/invoices">Invoices</Link>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
