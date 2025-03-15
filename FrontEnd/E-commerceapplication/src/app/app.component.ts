import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import {ProductsComponent} from './products/products.component'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-commerceapplication';
  constructor(private router: Router) {}

  goToProducts() {
    this.router.navigate(['/products']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }
}
