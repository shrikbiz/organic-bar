import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  // cart: any;
  category: string;
  cart$: Observable<ShoppingCart>;
  // subscription: Subscription;

  constructor( 
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) { 
    // productService
    // .getAll()
    // .switchMap(products => {
    //   let temp: any[];
    //   temp = products;
    //   this.products = temp;
    //   return route.queryParamMap;})
    //   .subscribe(params => {
    //     this.category = params.get('category');

    //     this.filteredProducts = (this.category) ?
    //       this.products.filter(p => p.category === this.category) :
    //       this.products;

    //   });
  }
  
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProduct();
    
    }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  private populateProduct(){
    this.productService
      .getAll()
      .switchMap(products => {
        let temp: any[];
        temp = products;
        this.products = temp;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
