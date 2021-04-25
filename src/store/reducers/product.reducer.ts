import {
  ProductActionTypes,
  ProductState,
} from '../../containers/Invoices/product.types';

const initialState: ProductState = {
  products: [],
};

const productReducer = (state = initialState, action: ProductActionTypes) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default productReducer;
