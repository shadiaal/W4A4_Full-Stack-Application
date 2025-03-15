import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../service/products.service';
import * as ProductActions from '../Actions/product.action';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from '../Reducers/product.reducer';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService) {}

  
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products: Product[]) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) => of(ProductActions.loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

 
  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap((action) =>
        this.productService.addProduct(action.product).pipe(
          map((product: Product) => ProductActions.addProductSuccess({ product })),
          catchError((error) => of(ProductActions.addProductFailure({ error: error.message })))
        )
      )
    )
  );


  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map(() => ProductActions.updateProductSuccess({ product: action.product })),
          catchError((error) => of(ProductActions.updateProductFailure({ error: error.message })))
        )
      )
    )
  );

 
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap((action) =>
        this.productService.deleteProduct(action.id).pipe(
          map(() => ProductActions.deleteProductSuccess({ id: action.id })),
          catchError((error) => of(ProductActions.deleteProductFailure({ error: error.message })))
        )
      )
    )
  );
}
