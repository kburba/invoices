export interface ProductState {
  products: Product[];
  isLoadedProducts: boolean;
}

export enum ProductActions {
  GET_PRODUCTS = 'GET_PRODUCTS',
  GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR',
}

export type Product = {
  id: number;
  name: string;
  price: number;
  isWeighted: boolean;
};
export interface GetProducts {
  type: typeof ProductActions.GET_PRODUCTS;
}
export interface GetProductsSuccess {
  type: typeof ProductActions.GET_PRODUCTS_SUCCESS;
  payload: Product[];
}

export interface GetProductsError {
  type: typeof ProductActions.GET_PRODUCTS_ERROR;
  error: string;
}

export type ProductActionTypes =
  | GetProducts
  | GetProductsSuccess
  | GetProductsError;
