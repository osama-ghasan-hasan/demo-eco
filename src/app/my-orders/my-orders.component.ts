import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent {
  orderData: order[] | undefined;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
  this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    orderId &&
      this.product.cancelOrder(orderId).subscribe(() => {
   this.getOrderList();
      });
  }
  getOrderList(){
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }
}
