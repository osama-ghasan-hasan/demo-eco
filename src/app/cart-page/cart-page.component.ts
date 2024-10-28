import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartList: cart[] | undefined;
  priceSummary: priceSummary={
    amount: 0,
    tax: 0,
    discount: 0,
    dilivary: 0,
    total: 0
  }
  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }


  loadDetails(){
    this.product.currentCart().subscribe((result) => {
      if (result) {
        console.log(result);
        this.cartList =result;
        let price= 0;
        result.forEach((item) => {
          if(item.quantity){
            price+= (+item.price * item.quantity);
          }
        
        });
        this.priceSummary.amount= price;
        this.priceSummary.tax=price/10;
        this.priceSummary.discount=price/10;
        this.priceSummary.dilivary=100;
        this.priceSummary.total=price+(price/10) + 100 -(price/10);
        if(!this.cartList.length){
          this.router.navigate(['/']);
        }
      }
    });
  }

  checkout(){
    this.router.navigate(['checkout'])
  }

  removeToCart(cartId: number|undefined){
    // cartId && this.product.removeToCart(cartId)
    cartId &&
    this.product.removeToCart(cartId).subscribe((result) => {
     this.loadDetails();
    });
  }
}
