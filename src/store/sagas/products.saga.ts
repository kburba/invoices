import { takeLatest, put, select } from 'redux-saga/effects';
import { ProductActions } from '../../containers/products/product.types';
import { formatNormalizedProducts } from '../../utils/utils';
import {
  getProductsError,
  getProductsSuccess,
} from '../actions/product.actions';
import PRODUCTS from '../data/products';
import { getIsloadedProductsFromStore } from './selectors';

function* getProductsSaga() {
  try {
    const isLoaded: boolean = yield select(getIsloadedProductsFromStore);
    if (!isLoaded) {
      const normalizedProducts = formatNormalizedProducts(PRODUCTS);
      yield put(getProductsSuccess(normalizedProducts));
    }
  } catch (e) {
    yield put(getProductsError(e));
  }
}

export default function* watchProductsSaga() {
  yield takeLatest(ProductActions.GET_PRODUCTS, getProductsSaga);
}
