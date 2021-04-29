import React, { useEffect } from 'react';
import { Formik, FieldArray, Form } from 'formik';
import { NewInvoice, NormalizedInvoices } from './invoice.types';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { NormalizedProducts } from '../products/product.types';
import { uiReducerState } from '../../store/types/ui.types';
import {
  saveInvoice,
  updateInvoice,
} from '../../store/actions/invoice.actions';

import * as Yup from 'yup';
import classnames from 'classnames';
import DatePicker from '../../components/DatePicker';
import moment from 'moment';
import {
  formatCurrency,
  formatDropdownOptions,
  formatNumber,
} from '../../utils/utils';
import Dropdown from '../../components/Dropdown';
import { resetErrors } from '../../store/actions/ui.actions';
import { getProducts } from '../../store/actions/product.actions';

export default function InvoiceFormik({
  history,
  match: {
    params: { invoiceId },
  },
}: RouteComponentProps<MatchParams>) {
  const dispatch = useDispatch();

  const { products, invoices, serverErrors } = useSelector<
    RootState,
    {
      products: NormalizedProducts;
      invoices: NormalizedInvoices;
      serverErrors: uiReducerState['errors'];
    }
  >(({ productReducer, invoiceReducer, uiReducer }) => ({
    products: productReducer.products,
    invoices: invoiceReducer.invoices,
    serverErrors: uiReducer.errors,
  }));

  // reset errors on component load
  useEffect(() => {
    dispatch(resetErrors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const selectedInvoice = invoiceId ? invoices.byId[invoiceId] : null;

  const defaultValues: NewInvoice = selectedInvoice
    ? { ...selectedInvoice }
    : {
        timestamp: new Date().getTime(),
        description: '',
        title: '',
        lines: [
          {
            product: '',
            quantity: 1,
            price: 0,
          },
        ],
      };

  function handleSubmit(data: NewInvoice) {
    const saveCallbackFn = () => history.push('/invoices');
    // use updateInvoice function when editing invoice
    if (invoiceId) {
      const dataWithId = { ...data, id: invoiceId };
      dispatch(updateInvoice(dataWithId, saveCallbackFn));
    } else {
      dispatch(saveInvoice(data, saveCallbackFn));
    }
  }

  // on edit view return Not Found if invoice was not found in store
  if (invoiceId && !selectedInvoice) {
    return (
      <div className="container">
        <div>Sorry, Invoice not found</div>
        <button type="button" onClick={() => history.push('/invoices')}>
          Go Back
        </button>
      </div>
    );
  }

  const productOptions = formatDropdownOptions(
    Object.values(products.byId),
    'name',
    'name'
  );

  return (
    <div className="container">
      <h1>{invoiceId ? 'Edit Invoice' : 'New invoice'}</h1>
      <Formik<NewInvoice>
        initialValues={defaultValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={schema}
      >
        {({ values, touched, errors, handleChange, setFieldValue }) => {
          const totalSum = values.lines.reduce((acc, curr) => {
            if (!isNaN(curr.price) && !isNaN(curr.quantity)) {
              return acc + curr.price * curr.quantity;
            }
            return acc;
          }, 0);
          const totalFormatted = formatCurrency(totalSum);
          return (
            <Form>
              <div className="inline">
                <div className="inputGroup inline inline--column">
                  <div
                    className={classnames('inputGroup', {
                      error: errors.title,
                    })}
                  >
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      placeholder="Enter title..."
                      name="title"
                      onChange={handleChange}
                    />
                    {errors.title && (
                      <div className="errorMsg">{errors.title}</div>
                    )}
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="date">Date</label>
                    <DatePicker
                      onChange={(date) =>
                        date && setFieldValue('timestamp', date.valueOf())
                      }
                      value={moment(values.timestamp)}
                    />
                  </div>
                </div>

                <div
                  className={classnames('inputGroup', {
                    error: errors.description,
                  })}
                >
                  <label htmlFor="description">Description</label>
                  <textarea
                    onChange={handleChange}
                    rows={6}
                    name="description"
                    placeholder="Describe invoice..."
                  />
                </div>
              </div>

              <div className="lines">
                <div className="line names">
                  <div>Product</div>
                  <div>Quantity</div>
                  <div>Price</div>
                  <div>Total</div>
                </div>
                <FieldArray
                  name="lines"
                  render={(arrayHelpers) => (
                    <>
                      {values.lines.map((field, idx) => {
                        const selectedProduct = products.byName[field.product];
                        const isWeighted =
                          selectedProduct && selectedProduct.isWeighted;
                        const fieldPrice = field.price
                          ? formatCurrency(field.price)
                          : '';
                        const fieldTotals = formatCurrency(
                          field.price * field.quantity
                        );
                        return (
                          <div className="line" key={`${idx}-${field.product}`}>
                            <div>
                              <Dropdown
                                data={productOptions}
                                name="product"
                                value={values.lines[idx].product}
                                onChange={(value) => {
                                  const selected = products.byName[value];
                                  setFieldValue(`lines.${idx}.product`, value);
                                  if (selected) {
                                    setFieldValue(
                                      `lines.${idx}.price`,
                                      selected.price
                                    );
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <input
                                placeholder={`Enter quantity${
                                  isWeighted ? ' (0,0000)' : ''
                                }...`}
                                name={`lines.${idx}.quantity`}
                                onChange={handleChange}
                                value={values.lines[idx].quantity}
                                onBlur={(e) => {
                                  const newValue = formatNumber(
                                    e.target.value,
                                    isWeighted ? 4 : 0
                                  );
                                  if (!isNaN(newValue)) {
                                    setFieldValue(
                                      `lines[${idx}].quantity`,
                                      newValue
                                    );
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <input
                                disabled
                                placeholder="Price"
                                value={fieldPrice}
                              />
                            </div>
                            <div>
                              <input type="text" disabled value={fieldTotals} />
                            </div>
                            {idx > 0 && (
                              <button onClick={() => arrayHelpers.remove(idx)}>
                                X
                              </button>
                            )}
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        className="basic"
                        onClick={() =>
                          arrayHelpers.push({
                            product: '',
                            quantity: 1,
                          })
                        }
                      >
                        + add product
                      </button>
                    </>
                  )}
                />
              </div>
              {values.lines.length > 0 && (
                <div className="text-right">
                  <h3>Total: {totalFormatted}</h3>
                </div>
              )}
              <div className="text-right">
                <button
                  className="basic"
                  type="button"
                  onClick={() => history.push('/invoices')}
                >
                  Cancel
                </button>
                <button className="primary" type="submit">
                  Save
                </button>
              </div>
              {serverErrors.saveInvoice && (
                <div className="errorMsg">{serverErrors.saveInvoice}</div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

type MatchParams = {
  invoiceId?: string;
};

const schema = Yup.object().shape({
  title: Yup.string().required('Please fill'),
  description: Yup.string(),
  timestamp: Yup.number().required('Please choose date'),
  lines: Yup.array()
    .min(1, 'Please add at least one product')
    .of(
      Yup.object().shape({
        product: Yup.string().required('Please fill'),
        quantity: Yup.number().required('Please fill'),
        price: Yup.number().required('Please fill'),
      })
    ),
});
