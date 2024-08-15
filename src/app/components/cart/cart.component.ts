import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reduce';
import { total } from '../../store/items.action';

@Component({
  selector: 'cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit{
  @Input() items: CartItem[] = [];
  @Input() total = 0;
  // productIdEmitter = new EventEmitter();

  constructor(
    private store: Store<{items: ItemsState}>,
    private sharing: SharingDataService,
    private router: Router) {
    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.total = state.total;
    });
  }
  ngOnInit(): void {
  }

  onDeleteCart(id: number) {
    // this.productIdEmitter.emit(id);
    // this.productIdEmitter.emit(id);
    this.sharing.productIdEmmiter.emit(id);
  }

}
