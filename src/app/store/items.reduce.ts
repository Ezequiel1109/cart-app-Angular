import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { add, remove, total } from './items.action';

export interface ItemsState{
    items: CartItem[],
    total: number
}

export const initialState: ItemsState = {
    items: JSON.parse(sessionStorage.getItem('cart')|| '[]'),
    total: 0
}
export const itemsReduce = createReducer(
    initialState,
    on(add, (state, {product}) =>{
        const hasItems = state.items.find((item: CartItem) => item.product.id === product.id);
      if (hasItems) {
      return {items: state.items.map((item: CartItem) => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      }),
      total: state.total + product.price
    };
    } else {
      return {items: [...state.items, {product:{...product}, quantity:1}],
      total: state.total + product.price
    };
      //this.items =[... this.items,{product:{...product}, quantity:1}];
    }
    }),
    on(remove, (state, {id}) =>{
        return {
            items: state.items.filter((item: CartItem) => item.product.id !== id),
            total: state.total
        }
    }),
    on(total, (state) =>{
        return {
            items: state.items,
            total: state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
        }
    })
)