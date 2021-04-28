import { combineReducers } from 'redux';
import invoiceReducer from './invoice.reducer';
import productReducer from './product.reducer';
import uiReducer from './ui.reducer';

const RootReducer = combineReducers({
  invoiceReducer,
  productReducer,
  uiReducer,
});

export default RootReducer;

export type RootState = ReturnType<typeof RootReducer>;
