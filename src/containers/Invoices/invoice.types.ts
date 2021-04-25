export enum InvoiceActions {
  GET_INVOICES = 'GET_INVOICES',
  GET_INVOICES_SUCCESS = 'GET_INVOICES_SUCCESS',
}

export type Invoice = {
  id: string;
  title: string;
  description: string;
  lines: {
    product: string;
    price: number;
    quantity: number;
  };
  timestamp: number;
};

export interface GetInvoices {
  type: typeof InvoiceActions.GET_INVOICES;
}
export interface GetInvoicesSuccess {
  type: typeof InvoiceActions.GET_INVOICES_SUCCESS;
  payload: Invoice[];
}

export type InvoiceActionTypes = GetInvoices | GetInvoicesSuccess;
