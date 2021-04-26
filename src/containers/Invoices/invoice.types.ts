export interface InvoicesState {
  invoices: Invoice[];
}

export enum InvoiceActions {
  SAVE_INVOICE = 'SAVE_INVOICE',
  SAVE_INVOICE_SUCCESS = 'SAVE_INVOICE_SUCCESS',
  SAVE_INVOICE_ERROR = 'SAVE_INVOICE_ERROR',
  GET_INVOICES = 'GET_INVOICES',
  GET_INVOICES_SUCCESS = 'GET_INVOICES_SUCCESS',
}

export type NewInvoice = Omit<Invoice, 'id'>;
export interface Invoice {
  id: string;
  title: string;
  description: string;
  lines: {
    product: string;
    price: number;
    quantity: number;
  }[];
  timestamp: number;
}

export interface SaveInvoice {
  type: typeof InvoiceActions.SAVE_INVOICE;
  payload: NewInvoice;
}
export interface SaveInvoiceSuccess {
  type: typeof InvoiceActions.SAVE_INVOICE_SUCCESS;
  payload: Invoice;
}
export interface SaveInvoiceError {
  type: typeof InvoiceActions.SAVE_INVOICE_ERROR;
  error: string;
}

export interface GetInvoices {
  type: typeof InvoiceActions.GET_INVOICES;
}
export interface GetInvoicesSuccess {
  type: typeof InvoiceActions.GET_INVOICES_SUCCESS;
  payload: Invoice[];
}

export type InvoiceActionTypes =
  | GetInvoices
  | GetInvoicesSuccess
  | SaveInvoice
  | SaveInvoiceSuccess
  | SaveInvoiceError;
