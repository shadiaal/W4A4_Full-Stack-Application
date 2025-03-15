import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../Actions/product.action';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductState {
  products: Product[];
  error: string | null;
  isLoading: boolean;
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false, // Add isLoading state
};

export const productReducer = createReducer(
  initialState,
  
  // When starting to load products, set isLoading to true
  on(ProductActions.loadProducts, state => ({
    ...state, isLoading: true
  })),

  // When products are successfully loaded, set isLoading to false and update the product list
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state, products, error: null, isLoading: false
  })),
  
  // When loading products fails, set isLoading to false and keep the error
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state, error, isLoading: false
  })),
  
  // When adding a product succeeds, set isLoading to false
  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state, products: [...state.products, product], isLoading: false
  })),
  
  // When updating a product succeeds, set isLoading to false
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state, products: state.products.map(p => p.id === product.id ? product : p), isLoading: false
  })),
  
  // When deleting a product succeeds, set isLoading to false
  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state, products: state.products.filter(p => p.id !== id), isLoading: false
  })),
  
  // When any operation (add, update, delete) fails, set isLoading to false
  on(ProductActions.addProductFailure, ProductActions.updateProductFailure, ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state, error, isLoading: false
  }))
);
