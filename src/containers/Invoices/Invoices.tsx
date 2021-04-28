import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '../../components/Table/Table';
import { TableValueTypes } from '../../components/Table/table.types';
import { RootState } from '../../store/reducers';
import { NormalizedInvoices } from './invoice.types';

export default function Invoices() {
  const invoices = useSelector<RootState, NormalizedInvoices>(
    ({ invoiceReducer }) => invoiceReducer.invoices
  );

  return (
    <div>
      <h1>Invoices</h1>
      <div>
        <Link to="/invoices/new">Create New Invoice</Link>
      </div>
      <Table
        data={Object.values(invoices.byId)}
        columns={[
          {
            title: 'Date',
            valueKey: 'timestamp',
            valueType: TableValueTypes.DATE,
          },
          {
            title: 'Name',
            valueKey: 'title',
            onClick: {
              linkKey: 'id',
              linkPrefix: '/invoices/edit/',
              type: 'link',
            },
          },
        ]}
      />
    </div>
  );
}
