export interface ProductState {
  products: NormalizedProducts;
  isLoadedProducts: boolean;
}

export enum ProductActions {
  GET_PRODUCTS = 'GET_PRODUCTS',
  GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR',
}
export type NormalizedProducts = {
  byId: {
    [id: string]: Product;
  };
  byName: {
    [name: string]: Product;
  };
  allNames: string[];
  allIds: string[];
};
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
  payload: NormalizedProducts;
}

export interface GetProductsError {
  type: typeof ProductActions.GET_PRODUCTS_ERROR;
  error: string;
}

export type ProductActionTypes =
  | GetProducts
  | GetProductsSuccess
  | GetProductsError;
