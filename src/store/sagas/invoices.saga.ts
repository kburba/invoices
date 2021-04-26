import { takeLatest, put } from 'redux-saga/effects';
import { ProductActions } from '../../containers/Invoices/product.types';
import {
  getProductsError,
  getProductsSuccess,
} from '../actions/product.actions';
import PRODUCTS from '../data/products';

function* getProductsSaga() {
  try {
    yield put(getProductsSuccess(PRODUCTS));
  } catch (e) {
    yield put(getProductsError(e));
  }
}

export default function* watchInvoicesSaga() {
  yield takeLatest(ProductActions.GET_PRODUCTS, getProductsSaga);
}
