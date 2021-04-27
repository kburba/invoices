import { takeLatest, put, select } from 'redux-saga/effects';
import { ProductActions } from '../../containers/products/product.types';
import {
  getProductsError,
  getProductsSuccess,
} from '../actions/product.actions';
import PRODUCTS from '../data/products';
import { getIsloadedProductsFromStore } from './selectors';

function* getProductsSaga() {
  try {
    console.log('saga');
    const isLoaded: boolean = yield select(getIsloadedProductsFromStore);
    if (!isLoaded) {
      yield put(getProductsSuccess(PRODUCTS));
    }
  } catch (e) {
    yield put(getProductsError(e));
  }
}

export default function* watchProductsSaga() {
  yield takeLatest(ProductActions.GET_PRODUCTS, getProductsSaga);
}
