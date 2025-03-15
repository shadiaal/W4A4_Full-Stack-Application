// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component'; 

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' }, 
  { path: 'products', component: ProductsComponent }, 
  { path: 'orders', component: OrderComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
