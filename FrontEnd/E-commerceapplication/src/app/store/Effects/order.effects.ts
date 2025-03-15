
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as OrderActions from '../Actions/order.actions';
import { OrderService } from '../../service/orders.service';
import { Order } from '../Reducers/order.reducer';
import { Observable } from 'rxjs';

@Injectable()
export class OrderEffects {
  
  constructor(private actions$: Actions, private orderService: OrderService) {}

  // Load Orders
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      switchMap(() =>
        this.orderService.getOrders().pipe( 
          map((orders: Order[]) => OrderActions.loadOrdersSuccess({ orders })),
          catchError((error) => of(OrderActions.loadOrdersFailure({ error: error.message })))
        )
      )
    )
  );

  // Place Order
  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.placeOrder),
      switchMap(({ order }) =>
        this.orderService.placeOrder(order).pipe( 
          map((newOrder: Order) => OrderActions.placeOrderSuccess({ order: newOrder })),
          catchError((error) => of(OrderActions.placeOrderFailure({ error: error.message })))
        )
      )
    )
  );
}
