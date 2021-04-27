import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { useFieldArray, useForm } from 'react-hook-form';
import { NewInvoice } from './invoice.types';
import { getProducts as getProductsAction } from '../../store/actions/product.actions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Dropdown from '../../components/Dropdown';
import { Product } from '../products/product.types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { saveInvoice } from '../../store/actions/invoice.actions';
import DatePicker from '../../components/DatePicker';
import { formatCurrency, formatDropdownOptions } from '../../utils/utils';

type MatchParams = {
  invoiceId?: string;
};

export default function InvoiceForm({
  history,
  match: {
    params: { invoiceId },
  },
}: RouteComponentProps<MatchParams>) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewInvoice>({
    defaultValues: {
      timestamp: new Date().getTime(),
      lines: [],
    },
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur',
    mode: 'all',
  });
  const { timestamp, lines } = watch();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('dispatch');
    dispatch(getProductsAction());
  }, [dispatch]);

  const products = useSelector<RootState, Product[]>(
    ({ productReducer }) => productReducer.products
  );

  const { fields, remove, append } = useFieldArray({ control, name: 'lines' });

  const productOptions = formatDropdownOptions(products, 'name', 'name');

  const totalSum = lines.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const totalFormatted = formatCurrency(totalSum);

  const onSubmit = handleSubmit((data) => {
    const saveCallbackFn = () => history.push('/invoices');
    dispatch(saveInvoice(data, saveCallbackFn));
  });

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        <h1>{invoiceId ? 'Edit Invoice' : 'New invoice'}</h1>
        <div>
          <label htmlFor="title">Title:</label>
          <input placeholder="Enter title..." {...register('title')} />
          {errors.title && <div>{errors.title.message}</div>}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            {...register('description')}
            rows={4}
            name="description"
            placeholder="Describe invoice..."
          />
          {errors.description && <div>{errors.description.message}</div>}
        </div>
        <div className="lines">
          {fields.map((field, idx) => {
            const productName = watch(
              `lines.${idx}.product` as `lines.0.product`
            );
            const selectedProduct = products.find(
              (x) => x.name === productName
            );
            const isWeighted = selectedProduct && selectedProduct.isWeighted;
            return (
              <div className="line" key={field.id}>
                <Dropdown
                  data={productOptions}
                  {...register(`lines.${idx}.product` as `lines.0.product`)}
                  name="product"
                  value={watch(`lines.${idx}.product` as `lines.0.product`)}
                  onChange={(e) => {
                    const selected = products.find(
                      (x) => x.name === productName
                    );
                    setValue(
                      `lines.${idx}.product` as `lines.0.product`,
                      e.target.value
                    );
                    if (selected) {
                      setValue(
                        `lines.${idx}.price` as `lines.0.price`,
                        selected.price
                      );
                    }
                  }}
                  error={
                    errors.lines && Array.isArray(errors.lines)
                      ? errors.lines[idx]?.product?.message
                      : undefined
                  }
                />
                <input
                  placeholder="Enter quantity..."
                  type="number"
                  {...register(`lines.${idx}.quantity` as `lines.0.quantity`)}
                  value={
                    isNaN(watch(`lines.${idx}.quantity` as `lines.0.quantity`))
                      ? ''
                      : watch(`lines.${idx}.quantity` as `lines.0.quantity`)
                  }
                  onBlur={(e) => {
                    const val = e.target.value;
                    const newValue = parseFloat(
                      parseFloat(val).toFixed(isWeighted ? 4 : 0)
                    );
                    if (!isNaN(newValue)) {
                      setValue(
                        `lines.${idx}.quantity` as `lines.0.quantity`,
                        newValue
                      );
                    }
                  }}
                />
                <input
                  disabled
                  value={
                    isNaN(watch(`lines.${idx}.price` as `lines.0.price`))
                      ? ''
                      : watch(`lines.${idx}.price` as `lines.0.price`)
                  }
                />
                <input
                  disabled
                  value={
                    (
                      watch(`lines.${idx}.price` as `lines.0.price`) *
                      watch(`lines.${idx}.quantity` as `lines.0.quantity`)
                    ).toFixed(2) || 0
                  }
                />
                <button onClick={() => remove(idx)}>X</button>
              </div>
            );
          })}
          {lines.length > 0 && <div>Total: {totalFormatted}</div>}
          <button
            onClick={() =>
              append({
                product: products[0].name,
                price: products[0].price,
              })
            }
          >
            add product
          </button>
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
      </form>
    </>
  );
}

const schema = yup.object().shape({
  title: yup.string().required('Please fill'),
  description: yup.string().required('Please fill'),
  timestamp: yup.string().required('Please choose date'),
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
