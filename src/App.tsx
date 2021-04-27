import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NewInvoiceForm from './containers/invoices/InvoiceForm';
import Invoices from './containers/invoices/Invoices';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/invoices/new" component={NewInvoiceForm} />
        <Route path="/invoices/edit/:invoiceId" component={NewInvoiceForm} />
        <Route path="/invoices" component={Invoices} />
        <Route path="/">
          <Link to="/invoices">Invoices</Link>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
