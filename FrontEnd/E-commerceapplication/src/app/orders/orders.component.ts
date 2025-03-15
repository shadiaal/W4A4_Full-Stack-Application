import { loadOrders, placeOrder,Order } from '../store/Actions/order.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../store/Reducers/product.reducer'; 
import { selectAllOrders } from '../store/Selectors/order.selectors'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-orders',
 imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrderComponent implements OnInit {

  orders$: Observable<Order[]>; 

  constructor(private store: Store) {
    this.orders$ = this.store.select(selectAllOrders); 
  }

  ngOnInit(): void {
   
  }
}
