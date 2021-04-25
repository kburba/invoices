export interface ProductState {
  products: Product[];
}

export enum ProductActions {
  GET_PRODUCTS = 'GET_PRODUCTS',
  GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
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

export type ProductActionTypes = GetProducts | GetProductsSuccess;
