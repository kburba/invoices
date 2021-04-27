import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '../../components/Table/Table';
import { TableValueTypes } from '../../components/Table/table.types';
import { RootState } from '../../store/reducers';
import { Invoice } from './invoice.types';

export default function Invoices() {
  const invoices = useSelector<RootState, Invoice[]>(
    ({ invoiceReducer }) => invoiceReducer.invoices
  );

  return (
    <div>
      <h1>Invoices</h1>
      <div>
        <Link to="/invoices/new">Create New Invoice</Link>
      </div>
      <Table
        data={invoices}
        columns={[
          {
            title: 'Date',
            valueKey: 'timestamp',
            valueType: TableValueTypes.DATE,
          },
          {
            title: 'Name',
            valueKey: 'title',
          },
        ]}
      />
      {invoices.length}
    </div>
  );
}
