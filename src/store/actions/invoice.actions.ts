import {
  GetInvoices,
  GetInvoicesSuccess,
  Invoice,
  InvoiceActions,
  NewInvoice,
  SaveInvoice,
  SaveInvoiceError,
  SaveInvoiceSuccess,
} from '../../containers/Invoices/invoice.types';

export function saveInvoice(newInvoice: NewInvoice): SaveInvoice {
  return {
    type: InvoiceActions.SAVE_INVOICE,
    payload: newInvoice,
  };
}

export function saveInvoiceSuccess(invoice: Invoice): SaveInvoiceSuccess {
  return {
    type: InvoiceActions.SAVE_INVOICE_SUCCESS,
    payload: invoice,
  };
}

export function saveInvoiceError(error: string): SaveInvoiceError {
  return {
    type: InvoiceActions.SAVE_INVOICE_ERROR,
    error,
  };
}

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
