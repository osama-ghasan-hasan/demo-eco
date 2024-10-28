import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent {
  productData: undefined | product;
  productMessage: undefined | string;

  constructor(
    private routerActivated: ActivatedRoute,
    private product: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    let productId = this.routerActivated.snapshot.paramMap.get('id');
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        this.productData = data;
      });
  }

  submit(data: product) {
    if (this.productData) {
      data.id = this.productData.id;
      console.log(data);
      this.product.updateProduct(data).subscribe((result) => {
        if (result) {
          this.productMessage = 'Product has Updated';
        }
      });
      setTimeout(() => {
        this.productMessage= undefined;
        this.router.navigate(['seller-home']);
      }, 3000);
    }
  }
}
