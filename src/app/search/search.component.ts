import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent  implements OnInit{
  searchResult: undefined | product[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit() {
    let query = this.activatedRoute.snapshot.paramMap.get('query');
    console.log(query);
    query &&
      this.product.searchProduct(query).subscribe((result) => {
        this.searchResult = result;
      });
  }
}
