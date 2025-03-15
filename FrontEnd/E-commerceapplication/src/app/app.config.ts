import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { productReducer } from './store/Reducers/product.reducer'; 
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/Effects/product.effects';
import { provideEffects } from '@ngrx/effects';
import { orderReducer } from './store/Reducers/order.reducer';
import { OrderEffects } from './store/Effects/order.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore({ 
      products: productReducer, 
      orders: orderReducer  
    }), 
    

    provideEffects([ProductEffects, OrderEffects]), 
  ]
};
