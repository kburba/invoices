import {
  GetProducts,
  GetProductsError,
  GetProductsSuccess,
  Product,
  ProductActions,
} from '../../containers/products/product.types';

export function getProducts(): GetProducts {
  return {
    type: ProductActions.GET_PRODUCTS,
  };
}

export function getProductsSuccess(products: Product[]): GetProductsSuccess {
  return {
    type: ProductActions.GET_PRODUCTS_SUCCESS,
    payload: products,
  };
}

export function getProductsError(error: string): GetProductsError {
  return {
    type: ProductActions.GET_PRODUCTS_ERROR,
    error,
  };
}
