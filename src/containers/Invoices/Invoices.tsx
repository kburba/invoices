import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '../../components/Table/Table';
import {
  TableColumn,
  TableValueTypes,
} from '../../components/Table/table.types';
import { RootState } from '../../store/reducers';
import { Invoice, NormalizedInvoices } from './invoice.types';
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
      .map((x) => x.price * x.quantity)
      .reduce((linesSum, value) => linesSum + value, 0);
    return sum + invoiceSum;
  }, 0);

  const filteredInvoices: Invoice[] = filterByDateRange(
    Object.values(invoices.byId),
    'timestamp',
    dateRange
  );
  const sortedInvoices = filteredInvoices.sort((a, b) => {
    if (a.timestamp > b.timestamp) return -1;
    if (b.timestamp < a.timestamp) return 1;
    return 0;
  });

  const handleDateChange = (dateRange: DateRangeType) =>
    dispatch(setDateRange(dateRange));

  const showInvoices = invoices.allIds.length > 0;

  return (
    <div className="container invoices">
      <h1>Invoices</h1>
      <div className="text-right inline topControls">
        {showInvoices && (
          <div>
            <RangeDatePicker
              dateRange={dateRange}
              onChange={handleDateChange}
            />
          </div>
        )}
        <div>
          <Link className="buttonLink" to="/invoices/new">
            <button type="button" className="basic kbbutton">
              Create New Invoice
            </button>
          </Link>
        </div>
      </div>
      {showInvoices ? (
        <>
          <Table data={sortedInvoices} columns={INVOICE_TABLE_COLUMNS} />
          <div className="text-center text-small">
            {`Showing ${filteredInvoices.length} of ${invoices.allIds.length}`}
          </div>
        </>
      ) : (
        <div className="text-center text-small">No invoices.</div>
      )}
      {showInvoices && (
        <div className="text-right">
          <h3>Total: {formatCurrency(totalSum)}</h3>
        </div>
      )}
    </div>
  );
}

const INVOICE_TABLE_COLUMNS: TableColumn[] = [
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
  {
    title: 'Description',
    valueKey: 'description',
  },
];
