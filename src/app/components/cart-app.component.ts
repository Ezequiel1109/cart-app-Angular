import { Component, EventEmitter, OnInit } from '@angular/core';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reduce';
import { add, remove, total } from '../store/items.action';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];

  constructor(
    private store: Store<{items: ItemsState}>,
    private router:Router, 
    private sharing:SharingDataService) {
      this.store.select('items').subscribe(state => {
        this.items = state.items;
        this.saveSession();
        console.log("cambio el estado");
      })
    }

  ngOnInit(): void {
  
    this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharing.productEventEmitter.subscribe(product =>{
      this.store.dispatch(add({product}));
        //redirige hacia el carro de compras
      this.router.navigate(['/cart'])

      Swal.fire({
        title: "Shopping Cart",
        text: "Nuevo producto agregado al carro!",
        icon: "success"
      });

    });
    
  }

  onDeleteCart(): void {
    this.sharing.productIdEmmiter.subscribe(id =>{
      Swal.fire({
        title: "Esta seguro que desea eliminar el producto?",
        text: "Una vez que se  elimine, ya no estara en el carro de compras",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(remove({id}));
          this.store.dispatch(total());
          this.router.navigate(['/cart']);
          Swal.fire({
            title: "Eliminado!",
            text: "eliminacion del producto.",
            icon: "success"
          });
        }
      });

    })
  }



  saveSession():void{
    //convierte un objeto a una estructura json como texto
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
