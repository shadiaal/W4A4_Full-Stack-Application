import { createReducer, on } from '@ngrx/store';
import * as OrderActions from '../Actions/order.actions';

// Define Order Model
export interface Order {
  id?: number;
  customerName: string;
  productId: number;
  quantity: number;
  totalPrice: number;
  orderDate?: Date;
}

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.loadOrders, state => ({ ...state, loading: true })),
  on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({ ...state, loading: false, orders })),
  on(OrderActions.loadOrdersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(OrderActions.placeOrder, state => ({ ...state, loading: true })),
  on(OrderActions.placeOrderSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    orders: [...state.orders, order]
  })),
  on(OrderActions.placeOrderFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

