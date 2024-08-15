import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { itemsReduce } from './store/items.reduce';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productsReduce } from './store/products.reduce';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './store/effects/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStore({
        items: itemsReduce,
        products: productsReduce
    }), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), 
    provideEffects(ProductsEffects)]
};
