import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { useFieldArray, useForm } from 'react-hook-form';
import { NewInvoice, NormalizedInvoices } from './invoice.types';
import { getProducts as getProductsAction } from '../../store/actions/product.actions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Dropdown from '../../components/Dropdown';
import { NormalizedProducts } from '../products/product.types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { RouteComponentProps } from 'react-router';
import {
  saveInvoice,
  updateInvoice,
} from '../../store/actions/invoice.actions';
import DatePicker from '../../components/DatePicker';
import {
  formatCurrency,
  formatDropdownOptions,
  formatNumber,
} from '../../utils/utils';
import { uiReducerState } from '../../store/types/ui.types';
import { resetErrors } from '../../store/actions/ui.actions';
import classnames from 'classnames';

type MatchParams = {
  invoiceId?: string;
};

export default function InvoiceForm({
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

  const selectedInvoice = invoiceId ? invoices.byId[invoiceId] : null;

  const defaultValues = selectedInvoice
    ? { ...selectedInvoice }
    : {
        timestamp: new Date().getTime(),
        lines: [
          {
            product: '',
          },
        ],
      };

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewInvoice>({
    defaultValues,
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur',
    mode: 'all',
  });
  const { timestamp, lines } = watch();

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  const { fields, remove, append } = useFieldArray({ control, name: 'lines' });

  const productOptions = formatDropdownOptions(
    Object.values(products.byId),
    'name',
    'name'
  );
  const totalSum = lines.reduce((acc, curr) => {
    if (!isNaN(curr.price) && !isNaN(curr.quantity)) {
      return acc + curr.price * curr.quantity;
    }
    return acc;
  }, 0);
  const totalFormatted = formatCurrency(totalSum);

  const onSubmit = handleSubmit((data) => {
    const saveCallbackFn = () => history.push('/invoices');
    // use updateInvoice function when editing invoice
    if (invoiceId) {
      const dataWithId = { ...data, id: invoiceId };
      dispatch(updateInvoice(dataWithId, saveCallbackFn));
    } else {
      dispatch(saveInvoice(data, saveCallbackFn));
    }
  });

  // on edit view return Not Found if invoice was not found in store
  if (invoiceId && !selectedInvoice) {
    return (
      <div>
        <div>Sorry, Invoice not found</div>
        <button type="button" onClick={() => history.push('/invoices')}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} noValidate>
        <h1>{invoiceId ? 'Edit Invoice' : 'New invoice'}</h1>
        <div className="inline">
          <div className="inputGroup inline inline--column">
            <div className={classnames('inputGroup', { error: errors.title })}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Enter title..."
                {...register('title')}
              />
              {errors.title && (
                <div className="errorMsg">{errors.title.message}</div>
              )}
            </div>
            <div className="inputGroup">
              <label htmlFor="date">Date</label>
              <DatePicker
                onChange={(date) =>
                  date && setValue('timestamp', date.valueOf())
                }
                value={moment(timestamp)}
              />
            </div>
          </div>

          <div
            className={classnames('inputGroup', { error: errors.description })}
          >
            <label htmlFor="description">Description</label>
            <textarea
              {...register('description')}
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
          {fields.map((field, idx) => {
            const product = `lines.${idx}.product` as `lines.0.product`;
            const price = `lines.${idx}.price` as `lines.0.price`;
            const quantity = `lines.${idx}.quantity` as `lines.0.quantity`;

            const fieldTotals =
              watch(price) &&
              watch(quantity) &&
              !isNaN(watch(price) * watch(quantity))
                ? formatCurrency(watch(price) * watch(quantity))
                : 0;

            const fieldPrice = watch(price) ? formatCurrency(watch(price)) : '';

            const productName = watch(product);
            const selectedProduct = products.byName[productName];
            const isWeighted = selectedProduct && selectedProduct.isWeighted;
            return (
              <div className="line" key={field.id}>
                <div>
                  <Dropdown
                    data={productOptions}
                    {...register(product)}
                    name="product"
                    value={watch(product)}
                    onChange={(value) => {
                      const selected = products.byName[value];
                      setValue(product, value);
                      if (selected) {
                        setValue(price, selected.price);
                      }
                    }}
                  />
                </div>
                <div>
                  <input
                    placeholder={`Enter quantity${
                      isWeighted ? ' (0,0000)' : ''
                    }...`}
                    type="number"
                    className={classnames({
                      error:
                        errors.lines &&
                        Array.isArray(errors.lines) &&
                        errors.lines[idx]?.quantity,
                    })}
                    {...register(quantity)}
                    onBlur={(e) => {
                      const newValue = formatNumber(
                        e.target.value,
                        isWeighted ? 4 : 0
                      );
                      if (!isNaN(newValue)) {
                        setValue(quantity, newValue);
                      }
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    disabled
                    placeholder="Price"
                    value={fieldPrice}
                  />
                </div>
                <div>
                  <input type="text" disabled value={fieldTotals} />
                </div>
                {idx > 0 && <button onClick={() => remove(idx)}>X</button>}
              </div>
            );
          })}

          <button
            type="button"
            className="basic"
            onClick={() =>
              append({
                product: '',
              })
            }
          >
            + add product
          </button>
          {errors.lines && !Array.isArray(errors.lines) && (
            <div>Please add at least one product</div>
          )}
        </div>
        {lines.length > 0 && (
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
        {serverErrors.saveInvoice && <div>{serverErrors.saveInvoice}</div>}
      </form>
    </div>
  );
}

const schema = yup.object().shape({
  title: yup.string().required('Please fill'),
  description: yup.string(),
  timestamp: yup.number().required('Please choose date'),
  lines: yup
    .array()
    .min(1, 'Please add at least one product')
    .of(
      yup.object().shape({
        product: yup.string().required('Please fill'),
        quantity: yup.number().required('Please fill'),
        price: yup.number().required('Please fill'),
      })
    ),
});
