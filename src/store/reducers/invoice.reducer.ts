import {
  InvoiceActions,
  InvoiceActionTypes,
  InvoicesState,
} from '../../containers/Invoices/invoice.types';

const initialState: InvoicesState = {
  invoices: [],
};

const productReducer = (state = initialState, action: InvoiceActionTypes) => {
  switch (action.type) {
    case InvoiceActions.SAVE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      };
    default:
      return state;
  }
};

export default productReducer;
