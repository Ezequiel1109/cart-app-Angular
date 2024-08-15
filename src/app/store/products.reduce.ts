import { createReducer, on } from "@ngrx/store"
import { load, findAll } from "./products.action"

const products: any[] = [];
const initialState ={
    products
}

export const productsReduce = createReducer(
    initialState,
    on(load, (state)=>({products:[... state.products]})),
    on(findAll, (state, {products})=>({products:[... products]}))
)