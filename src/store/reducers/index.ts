import { combineReducers } from 'redux';
import invoiceReducer from './invoice.reducer';
import productReducer from './product.reducer';

const RootReducer = combineReducers({
  invoiceReducer,
  productReducer,
});

export default RootReducer;

export type RootState = ReturnType<typeof RootReducer>;
