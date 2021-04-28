import {
  GetInvoices,
  GetInvoicesSuccess,
  Invoice,
  InvoiceActions,
  NewInvoice,
  SaveInvoice,
  SaveInvoiceError,
  SaveInvoiceSuccess,
  UpdateInvoice,
  UpdateInvoiceSuccess,
} from '../../containers/invoices/invoice.types';

export function updateInvoice(
  invoice: Invoice,
  callbackFn?: () => void
): UpdateInvoice {
  return {
    type: InvoiceActions.UPDATE_INVOICE,
    payload: { invoice, callbackFn },
  };
}

export function updateInvoiceSuccess(invoice: Invoice): UpdateInvoiceSuccess {
  return {
    type: InvoiceActions.UPDATE_INVOICE_SUCCESS,
    payload: invoice,
  };
}

export function saveInvoice(
  invoice: NewInvoice,
  callbackFn?: () => void
): SaveInvoice {
  return {
    type: InvoiceActions.SAVE_INVOICE,
    payload: { invoice, callbackFn },
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
