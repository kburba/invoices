import {
  ProductActions,
  ProductActionTypes,
  ProductState,
} from '../../containers/products/product.types';

const initialState: ProductState = {
  products: [],
  isLoadedProducts: false,
};

const productReducer = (state = initialState, action: ProductActionTypes) => {
  switch (action.type) {
    case ProductActions.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isLoadedProducts: true,
      };
    default:
      return state;
  }
};

export default productReducer;
