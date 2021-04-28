export interface InvoicesState {
  invoices: NormalizedInvoices;
}

export enum InvoiceActions {
  SAVE_INVOICE = 'SAVE_INVOICE',
  SAVE_INVOICE_SUCCESS = 'SAVE_INVOICE_SUCCESS',
  UPDATE_INVOICE = 'UPDATE_INVOICE',
  UPDATE_INVOICE_SUCCESS = 'UPDATE_INVOICE_SUCCESS',
  SAVE_INVOICE_ERROR = 'SAVE_INVOICE_ERROR',
  GET_INVOICES = 'GET_INVOICES',
  GET_INVOICES_SUCCESS = 'GET_INVOICES_SUCCESS',
}

export type NormalizedInvoices = {
  byId: { [id: string]: Invoice };
  allIds: string[];
};
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

export interface UpdateInvoice {
  type: typeof InvoiceActions.UPDATE_INVOICE;
  payload: { invoice: Invoice; callbackFn?: () => void };
}
export interface UpdateInvoiceSuccess {
  type: typeof InvoiceActions.UPDATE_INVOICE_SUCCESS;
  payload: Invoice;
}

export interface SaveInvoice {
  type: typeof InvoiceActions.SAVE_INVOICE;
  payload: { invoice: NewInvoice; callbackFn?: () => void };
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
  | SaveInvoiceError
  | UpdateInvoice
  | UpdateInvoiceSuccess;
