import {
  InvoiceActions,
  InvoiceActionTypes,
  InvoicesState,
} from '../../containers/invoices/invoice.types';

const initialState: InvoicesState = {
  invoices: {
    allIds: [],
    byId: {},
  },
};

const productReducer = (state = initialState, action: InvoiceActionTypes) => {
  switch (action.type) {
    case InvoiceActions.SAVE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: {
          byId: {
            ...state.invoices.byId,
            [action.payload.id]: { ...action.payload },
          },
          allIds: [...state.invoices.allIds, action.payload.id],
        },
      };
    default:
      return state;
  }
};

export default productReducer;
