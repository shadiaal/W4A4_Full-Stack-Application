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
  isLoading: false, 
};

export const productReducer = createReducer(
  initialState,
  
 
  on(ProductActions.loadProducts, state => ({
    ...state, isLoading: true
  })),

  
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state, products, error: null, isLoading: false
  })),
  
 
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state, error, isLoading: false
  })),
  

  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state, products: [...state.products, product], isLoading: false
  })),
  
 
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state, products: state.products.map(p => p.id === product.id ? product : p), isLoading: false
  })),
  

  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state, products: state.products.filter(p => p.id !== id), isLoading: false
  })),
  
 
  on(ProductActions.addProductFailure, ProductActions.updateProductFailure, ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state, error, isLoading: false
  }))
);
