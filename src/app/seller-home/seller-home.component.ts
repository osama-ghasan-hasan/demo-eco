import { product } from './../data-type';
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { faTrash , faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {
  productList: undefined | product[];
  productMessage: undefined | string;
  icon = faTrash;
  iconEdit = faEdit;

  constructor(private product: ProductService) {}

  ngOnInit() {
    this.list();
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        this.list();
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }
}
