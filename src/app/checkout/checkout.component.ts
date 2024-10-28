import { Component } from '@angular/core';
import { cart, order, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {

  totalPrice: number = 0;
  cartData: cart[]|undefined;
  orderMsg: string|undefined;

  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      this.cartData= result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price += +item.price * item.quantity;
        }
      });
      this.totalPrice = price+(price/10) + 100 -(price/10);
      console.log(this.totalPrice);
    });
  }

  orderNow(data: {email: string, address: string, contact: string}) {
    console.log(data);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id

    if(this.totalPrice){
      let orderData: order ={
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
        item.id &&  this.product.deleteCartItems(item.id)
        }, 600);
      })

      this.product.orderNow(orderData).subscribe((result) => {
        if(result){
          this.orderMsg="your order has been placed"
         setTimeout(() => {
          this.router.navigate(['my-orders']);
          this.orderMsg=undefined;
         }, 4000);
        }
      })
    }
    
  }
}
