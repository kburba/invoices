import { takeLatest, put } from 'redux-saga/effects';
import {
  InvoiceActions,
  SaveInvoice,
  UpdateInvoice,
} from '../../containers/invoices/invoice.types';
import {
  saveInvoiceSuccess,
  updateInvoiceSuccess,
} from '../actions/invoice.actions';
import { v4 as uuidv4 } from 'uuid';
import { resetErrors, setError } from '../actions/ui.actions';

function* updateInvoiceSaga({
  payload: { invoice, callbackFn },
}: UpdateInvoice) {
  try {
    // randomly throw error
    const throwErr = Math.floor(Math.random() * 10) % 2 > 0;
    if (throwErr) {
      throw new Error('Error updating invoice. Please try again');
    }
    yield put(updateInvoiceSuccess(invoice));
    if (callbackFn) {
      callbackFn();
    }
  } catch (e) {
    yield put(setError({ key: 'saveInvoice', message: e.message }));
  }
}

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
      throw new Error('Error saving invoice. Please try again');
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
  yield takeLatest(InvoiceActions.UPDATE_INVOICE, updateInvoiceSaga);
}
