import { takeLatest, put } from 'redux-saga/effects';
import {
  InvoiceActions,
  SaveInvoice,
} from '../../containers/invoices/invoice.types';
import { saveInvoiceSuccess } from '../actions/invoice.actions';
import { v4 as uuidv4 } from 'uuid';
import { resetErrors, setError } from '../actions/ui.actions';

function* saveInvoiceSaga({ payload: { invoice, callbackFn } }: SaveInvoice) {
  try {
    yield put(resetErrors());
    const savedInvoice = {
      ...invoice,
      id: uuidv4(),
    };
    // randomly throw error
    const throwErr = Math.floor(Math.random() * 10) % 2 > 0;
    if (throwErr) {
      throw new Error('Error saving invoice');
    }
    yield put(saveInvoiceSuccess(savedInvoice));
    if (callbackFn) {
      callbackFn();
    }
  } catch (e) {
    yield put(setError({ key: 'saveInvoice', message: e.message }));
  }
}

export default function* watchInvoicesSaga() {
  yield takeLatest(InvoiceActions.SAVE_INVOICE, saveInvoiceSaga);
}
