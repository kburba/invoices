import { takeLatest, put } from 'redux-saga/effects';
import {
  InvoiceActions,
  SaveInvoice,
} from '../../containers/invoices/invoice.types';
import {
  saveInvoiceError,
  saveInvoiceSuccess,
} from '../actions/invoice.actions';
import { v4 as uuidv4 } from 'uuid';

function* saveInvoiceSaga({ payload: { invoice, callbackFn } }: SaveInvoice) {
  try {
    const savedInvoice = {
      ...invoice,
      id: uuidv4(),
    };
    yield put(saveInvoiceSuccess(savedInvoice));
    if (callbackFn) {
      callbackFn();
    }
  } catch (e) {
    yield put(saveInvoiceError(e));
  }
}

export default function* watchInvoicesSaga() {
  yield takeLatest(InvoiceActions.SAVE_INVOICE, saveInvoiceSaga);
}
