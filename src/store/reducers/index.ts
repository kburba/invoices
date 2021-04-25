import { combineReducers } from 'redux';
import invoiceReducer from './invoice.reducer';

const RootReducer = combineReducers({
  invoices: invoiceReducer,
});

export default RootReducer;

export type RootState = ReturnType<typeof RootReducer>;
