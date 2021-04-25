import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { useForm } from 'react-hook-form';
import { NewInvoice } from './invoice.types';
import { getProducts as getProductsAction } from '../../store/actions/product.actions';

export default function NewInvoiceForm() {
  const { register, handleSubmit } = useForm<NewInvoice>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  const products = useSelector<RootState>(
    ({ productReducer }) => productReducer.products
  );
  console.log('products', products);

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input placeholder="Enter title..." {...register('title')} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          {...register('description')}
          rows={4}
          name="description"
          placeholder="Describe invoice..."
        ></textarea>
      </div>
      <div className="lines">
        <div className="line">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
        </div>
        <div className="line">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
        </div>
        <div className="line">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
        </div>
      </div>
      <div>timestamp</div>
    </form>
  );
}
