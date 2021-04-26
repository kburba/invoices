/** rootSaga.js */
import { all, fork } from 'redux-saga/effects';
import watchInvoicesSaga from './invoices.saga';
import watchProductsSaga from './products.saga';

// import watchers from other files
export default function* rootSaga() {
  yield all([fork(watchProductsSaga), fork(watchInvoicesSaga)]);
}

export type RootState = ReturnType<typeof rootSaga>;
