import { parse } from './../../../node_modules/@fortawesome/fontawesome-svg-core/index.d';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];
  cartItems=0;

  constructor(private router: Router, private product: ProductService) {}

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        }   else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
          this.product.getCartList(userData.id)
        }
         else {
          this.menuType = 'default';
        }
      }
    });

    let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.cartItems= JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items) => {
      this.cartItems= items.length;
    })
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
    this.product.cartData.emit([]);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['user-auth']);
  }

  submitSearch(val: string) {
    console.log(val);
    this.router.navigate([`search/${val}`]);
  }
  redirectToDetails(id: number) {
    this.router.navigate([`/details/${id}`]);
  }
}
