import { RootState } from '../reducers';

export const getIsloadedProductsFromStore = ({ productReducer }: RootState) =>
  productReducer.isLoadedProducts;
