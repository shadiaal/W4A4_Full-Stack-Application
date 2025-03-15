import { createAction, props } from '@ngrx/store';

// Define Order Model
export interface Order {
  id?: number;
  customerName: string;
  productId: number;
  quantity: number;
  totalPrice: number;
  orderDate?: Date;
  
}

// Load Orders
export const loadOrders = createAction('[Order] Load Orders');
export const loadOrdersSuccess = createAction('[Order] Load Orders Success', props<{ orders: Order[] }>());
export const loadOrdersFailure = createAction('[Order] Load Orders Failure', props<{ error: string }>());

// Place Order
export const placeOrder = createAction('[Order] Place Order', props<{ order: Order }>());
export const placeOrderSuccess = createAction('[Order] Place Order Success', props<{ order: Order }>());
export const placeOrderFailure = createAction('[Order] Place Order Failure', props<{ error: string }>());

