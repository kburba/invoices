import { takeLatest, put } from 'redux-saga/effects';
import {
  InvoiceActions,
  SaveInvoice,
} from '../../containers/Invoices/invoice.types';
import {
  saveInvoiceError,
  saveInvoiceSuccess,
} from '../actions/invoice.actions';
import { v4 as uuidv4 } from 'uuid';

function* saveInvoiceSaga({ payload }: SaveInvoice) {
  try {
    const savedInvoice = {
      ...payload,
      id: uuidv4(),
    };
    yield put(saveInvoiceSuccess(savedInvoice));
  } catch (e) {
    yield put(saveInvoiceError(e));
  }
}

export default function* watchProductsSaga() {
  yield takeLatest(InvoiceActions.SAVE_INVOICE, saveInvoiceSaga);
}
