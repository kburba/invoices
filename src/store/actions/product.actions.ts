import {
  GetProducts,
  GetProductsSuccess,
  Product,
  ProductActions,
} from '../../containers/Invoices/product.types';

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
