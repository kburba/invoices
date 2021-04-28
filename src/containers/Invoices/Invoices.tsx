import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '../../components/Table/Table';
import { TableValueTypes } from '../../components/Table/table.types';
import { RootState } from '../../store/reducers';
import { NormalizedInvoices } from './invoice.types';
import RangeDatePicker, {
  DateRangeType,
} from '../../components/RangeDatePicker';
import { filterByDateRange, formatCurrency } from '../../utils/utils';
import { uiReducerState } from '../../store/types/ui.types';
import { setDateRange } from '../../store/actions/ui.actions';

export default function Invoices() {
  const dispatch = useDispatch();

  const { invoices, dateRange } = useSelector<
    RootState,
    { invoices: NormalizedInvoices; dateRange: uiReducerState['filterRange'] }
  >(({ invoiceReducer, uiReducer }) => ({
    invoices: invoiceReducer.invoices,
    dateRange: uiReducer.filterRange,
  }));

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

  const handleDateChange = (dateRange: DateRangeType) =>
    dispatch(setDateRange(dateRange));

  return (
    <div className="container">
      <h1>Invoices</h1>
      <div>
        <Link to="/invoices/new">Create New Invoice</Link>
      </div>
      <RangeDatePicker dateRange={dateRange} onChange={handleDateChange} />
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
