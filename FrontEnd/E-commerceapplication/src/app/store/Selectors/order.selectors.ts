import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../Reducers/order.reducer';


export const selectOrderState = createFeatureSelector<OrderState>('orders');

export const selectAllOrders = createSelector(selectOrderState, state => state.orders);
export const selectOrderLoading = createSelector(selectOrderState, state => state.loading);
export const selectOrderError = createSelector(selectOrderState, state => state.error);



