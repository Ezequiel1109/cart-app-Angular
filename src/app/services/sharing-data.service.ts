import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {
  private _productIdEmitter: EventEmitter<number> = new EventEmitter();
  private _productEventEmitter: EventEmitter<Product> = new EventEmitter();
  constructor() { }

  get productIdEmmiter(): EventEmitter<number>{
    return this._productIdEmitter;
  }

  get productEventEmitter(): EventEmitter<Product>{
    return this._productEventEmitter;
  }

}
