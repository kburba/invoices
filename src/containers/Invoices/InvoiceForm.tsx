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
        lines: [],
      };
  console.log('selectedInvoice', selectedInvoice?.lines, defaultValues.lines);

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
  const totalSum = lines.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
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
        <div className="inputGroup">
          <label htmlFor="title">Title</label>
          <input placeholder="Enter title..." {...register('title')} />
          {errors.title && (
            <div className="errorMsg">{errors.title.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            {...register('description')}
            rows={4}
            name="description"
            placeholder="Describe invoice..."
          />
          {errors.description && (
            <div className="errorMsg">{errors.description.message}</div>
          )}
        </div>
        <div className="lines">
          {fields.map((field, idx) => {
            const product = `lines.${idx}.product` as `lines.0.product`;
            const price = `lines.${idx}.price` as `lines.0.price`;
            const quantity = `lines.${idx}.quantity` as `lines.0.quantity`;

            const fieldTotals =
              watch(price) &&
              watch(quantity) &&
              !isNaN(watch(price) * watch(quantity))
                ? (watch(price) * watch(quantity)).toFixed(2)
                : 0;

            const fieldPrice = watch(price) ? formatCurrency(watch(price)) : '';

            const productName = watch(product);
            const selectedProduct = products.byName[productName];
            const isWeighted = selectedProduct && selectedProduct.isWeighted;
            return (
              <div className="line" key={field.id}>
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
                  error={
                    errors.lines && Array.isArray(errors.lines)
                      ? errors.lines[idx]?.product?.message
                      : undefined
                  }
                />
                <input
                  placeholder={`Enter quantity${
                    isWeighted ? ' (0,0000)' : ''
                  }...`}
                  type="number"
                  // value={watch(quantity)}
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
                <input disabled value={fieldPrice} {...register} />
                <input disabled value={fieldTotals} />
                <button onClick={() => remove(idx)}>X</button>
              </div>
            );
          })}

          <button
            type="button"
            onClick={() =>
              append({
                product: '',
              })
            }
          >
            add product
          </button>
          {lines.length > 0 && <div>Total: {totalFormatted}</div>}
          {errors.lines && !Array.isArray(errors.lines) && (
            <div>Please add at least one product</div>
          )}
        </div>
        <DatePicker
          onChange={(date) => date && setValue('timestamp', date.valueOf())}
          value={moment(timestamp)}
        />
        <button type="button" onClick={() => history.push('/invoices')}>
          Cancel
        </button>
        <input type="submit" />
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
