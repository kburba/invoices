import {
  InvoiceActionTypes,
  InvoicesState,
} from '../../containers/Invoices/invoice.types';

const initialState: InvoicesState = {
  invoices: [],
};

const productReducer = (state = initialState, action: InvoiceActionTypes) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default productReducer;
