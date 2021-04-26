import {
  ProductActions,
  ProductActionTypes,
  ProductState,
} from '../../containers/Invoices/product.types';

const initialState: ProductState = {
  products: [],
};

const productReducer = (state = initialState, action: ProductActionTypes) => {
  switch (action.type) {
    case ProductActions.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
