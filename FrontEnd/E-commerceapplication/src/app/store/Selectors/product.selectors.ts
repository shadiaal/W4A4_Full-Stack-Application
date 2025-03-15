import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from '../Reducers/product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectError = createSelector(
  selectProductState,
  (state) => state.error
);

export const selectIsLoading = createSelector(
  selectProductState,
  (state) => state.isLoading
);


