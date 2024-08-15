import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { load, findAll } from '../products.action';
import { catchError, EMPTY, exhaustMap, map } from "rxjs";
import { ProductService } from "../../services/product.service";

@Injectable()
export class ProductsEffects {
    loadProducts = createEffect(
        () => this.actions$.pipe(
            ofType(load),
            exhaustMap(() => this.effects.findAll())
        ).pipe(
            map(products => findAll({ products })),
            catchError(()=> EMPTY)
        )
    );
    constructor(
        private actions$: Actions, 
        private effects: ProductService) {}
}