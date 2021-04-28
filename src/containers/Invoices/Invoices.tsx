import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '../../components/Table/Table';
import { TableValueTypes } from '../../components/Table/table.types';
import { RootState } from '../../store/reducers';
import { NormalizedInvoices } from './invoice.types';
import RangeDatePicker, {
  DateRangeType,
} from '../../components/RangeDatePicker';
import { filterByDateRange, formatCurrency } from '../../utils/utils';

const INITAL_DATES: DateRangeType = {
  startDate: moment().subtract(7, 'days'),
  endDate: moment(),
};

export default function Invoices() {
  const [dateRange, setDateRange] = useState<DateRangeType>(INITAL_DATES);

  const invoices = useSelector<RootState, NormalizedInvoices>(
    ({ invoiceReducer }) => invoiceReducer.invoices
  );

  const totalSum = invoices.allIds.reduce((sum, id): any => {
    const invoiceSum = invoices.byId[id].lines
      .map((x) => x.price)
      .reduce((linesSum, value) => linesSum + value, 0);
    return sum + invoiceSum;
  }, 0);

  const filteredInvoices = filterByDateRange(
    Object.values(invoices.byId),
    'timestamp',
    dateRange
  );

  return (
    <div>
      <h1>Invoices</h1>
      <div>
        <Link to="/invoices/new">Create New Invoice</Link>
      </div>
      <RangeDatePicker dateRange={dateRange} onChange={setDateRange} />
      <Table
        data={filteredInvoices}
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
      <h2>Total: {formatCurrency(totalSum)}</h2>
    </div>
  );
}
