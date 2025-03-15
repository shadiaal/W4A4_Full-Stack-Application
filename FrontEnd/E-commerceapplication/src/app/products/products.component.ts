import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts, deleteProduct, addProduct } from '../store/Actions/product.action';
import { selectAllProducts, selectError, selectIsLoading } from '../store/Selectors/product.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../store/Reducers/product.reducer'; 
import { Router } from '@angular/router'; 
import { placeOrder,Order } from '../store/Actions/order.actions';
@Component({
  standalone: true, 
  selector: 'app-products',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  products$: Observable<Product[]>; 
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>; 
  productForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder, private router: Router) {
    this.products$ = this.store.select(selectAllProducts);
    this.error$ = this.store.select(selectError);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());

   
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Delete a product
  onDelete(id: number) {
    this.store.dispatch(deleteProduct({ id }));
    this.store.dispatch(loadProducts());
  }


  onAddProduct() {
    if (this.productForm.valid) {
      const newProduct = {
        id: Math.floor(Math.random() * 10000), 
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        description: '', 
        category: 'Uncategorized', 
        image: 'https://via.placeholder.com/150' 
      };
  
      console.log('Adding product:', newProduct);
      this.store.dispatch(addProduct({ product: newProduct }));
      this.productForm.reset();
      this.store.dispatch(loadProducts());
    } else {
      console.log('Form is not valid');
    }
  }
  
  onPlaceOrder(product: Product) {
    const order: Order = {
      customerName: 'Name', 
      productId: product.id, 
      quantity: 1, 
      totalPrice: product.price, 
      orderDate: new Date() 
    };
  
    console.log('Order Data:', order); 
  
    this.store.dispatch(placeOrder({ order }));
  }
  
  // Reload the product list
  onRetry() {
    this.store.dispatch(loadProducts());
  }
}
