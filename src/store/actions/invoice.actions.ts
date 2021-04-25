import {
  GetInvoices,
  GetInvoicesSuccess,
  Invoice,
  InvoiceActions,
} from '../../containers/Invoices/invoice.types';

export function getInvoices(): GetInvoices {
  return {
    type: InvoiceActions.GET_INVOICES,
  };
}

export function getInvoicesSuccess(invoices: Invoice[]): GetInvoicesSuccess {
  return {
    type: InvoiceActions.GET_INVOICES_SUCCESS,
    payload: invoices,
  };
}
