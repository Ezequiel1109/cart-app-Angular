import { Component, EventEmitter, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;
  productIdEmitter = new EventEmitter();

  constructor(private router:Router, private sharing:SharingDataService, private service: ProductService) {}

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharing.productEventEmitter.subscribe(product =>{
      const hasItems = this.items.find((item) => item.product.id === product.id);
      if (hasItems) {
      this.items = this.items.map((item) => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    } else {
      this.items.push({ product, quantity: 1 });
      //this.items =[... this.items,{product:{...product}, quantity:1}];
    }
    this.calculateTotal();
    this.saveSession();
      //redirige hacia el carro de compras
    this.router.navigate(['/cart'],{
      state: {items:this.items, total:this.total}
    })

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
          this.items = this.items.filter((item) => item.product.id !== id);
          if(this.items.length == 0){
            sessionStorage.removeItem('cart');
            sessionStorage.clear();
          }
          this.calculateTotal();
          this.saveSession();
          //refrescar el carro de compra, se actualiza cada vez que se elimina alguna compra
          this.router.navigateByUrl('/', {skipLocationChange:true}).then(() =>{
            this.router.navigate(['/cart'],{
            state: {items:this.items, total:this.total}
            })
          });
          Swal.fire({
            title: "Eliminado!",
            text: "eliminacion del producto.",
            icon: "success"
          });
        }
      });

    })
  }

  calculateTotal():void{
    this.total = this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  saveSession():void{
    //convierte un objeto a una estructura json como texto
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
