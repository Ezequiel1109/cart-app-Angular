import {
  Component,
  EventEmitter,
  Input
} from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @Input() items: CartItem[] = [];
  @Input() total = 0;
  // productIdEmitter = new EventEmitter();

  constructor(private sharing: SharingDataService,private router: Router) {
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  onDeleteCart(id: number) {
    // this.productIdEmitter.emit(id);
    // this.productIdEmitter.emit(id);
    this.sharing.productIdEmmiter.emit(id);
  }

}
