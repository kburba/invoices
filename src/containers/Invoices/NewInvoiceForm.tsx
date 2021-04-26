import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { useFieldArray, useForm } from 'react-hook-form';
import { NewInvoice } from './invoice.types';
import { getProducts as getProductsAction } from '../../store/actions/product.actions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Dropdown from '../../components/Dropdown';
import { Product } from './product.types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { saveInvoice } from '../../store/actions/invoice.actions';

type MatchParams = {
  invoiceId?: string;
};

export default function NewInvoiceForm({
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
    },
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur',
    mode: 'all',
  });

  const [dateFocused, setDateFocused] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  const products = useSelector<RootState, Product[]>(
    ({ productReducer }) => productReducer.products
  );

  const { fields, remove, append } = useFieldArray({ control, name: 'lines' });

  const onSubmit = handleSubmit((data) => dispatch(saveInvoice(data)));

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
          {fields.map((field, idx) => (
            <div className="line" key={field.id}>
              <Dropdown
                data={products}
                nameKey="name"
                valueKey="name"
                value={watch(`lines.${idx}.product` as `lines.0.product`)}
                {...register(`lines.${idx}.product` as `lines.0.product`)}
                error={
                  errors.lines && Array.isArray(errors.lines)
                    ? errors.lines[idx]?.product?.message
                    : undefined
                }
              />
              <input
                placeholder="Enter quantity..."
                type="number"
                value={
                  isNaN(watch(`lines.${idx}.quantity` as `lines.0.quantity`))
                    ? ''
                    : watch(`lines.${idx}.quantity` as `lines.0.quantity`)
                }
                {...register(`lines.${idx}.quantity` as `lines.0.quantity`)}
                onBlur={(e) => {
                  const productName = watch(
                    `lines.${idx}.product` as `lines.0.product`
                  );
                  const selectedProduct = products.find(
                    (x) => x.name === productName
                  );
                  const isWeighted =
                    selectedProduct && selectedProduct.isWeighted;
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
                placeholder="Enter price..."
                type="number"
                {...register(`lines.${idx}.price` as `lines.0.price`)}
                value={
                  isNaN(watch(`lines.${idx}.price` as `lines.0.price`))
                    ? ''
                    : watch(`lines.${idx}.price` as `lines.0.price`)
                }
                onBlur={(e) => {
                  const newValue = parseFloat(
                    parseFloat(e.target.value).toFixed(2)
                  );
                  if (!isNaN(newValue)) {
                    setValue(`lines.${idx}.price` as `lines.0.price`, newValue);
                  }
                }}
              />

              <button onClick={() => remove(idx)}>X</button>
            </div>
          ))}
          <button
            onClick={() =>
              append({
                product: 'cinamon',
              })
            }
          >
            add product
          </button>
          {errors.lines && !Array.isArray(errors.lines) && (
            <div>Please add at least one product</div>
          )}
        </div>
        <div>
          <SingleDatePicker
            date={moment(watch('timestamp'))}
            onDateChange={(date) =>
              date && setValue('timestamp', date.valueOf())
            }
            isOutsideRange={() => false}
            focused={dateFocused}
            numberOfMonths={1}
            onFocusChange={({ focused }) => setDateFocused(focused)}
            id="invoiceTimestamp"
          />
        </div>
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
