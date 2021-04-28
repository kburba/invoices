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

const invoiceReducer = (
  state = initialState,
  action: InvoiceActionTypes
): InvoicesState => {
  switch (action.type) {
    case InvoiceActions.UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: {
          ...state.invoices,
          byId: {
            ...state.invoices.byId,
            [action.payload.id]: {
              ...state.invoices.byId[action.payload.id],
              ...action.payload,
            },
          },
        },
      };
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

export default invoiceReducer;
