import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { PRODUCTS } from '../AppModel/app.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
  encapsulation: ViewEncapsulation.None
})
export class WishlistComponent implements OnInit {

  constructor(private appService: AppService){}

  noOfWishlist:number
  products: PRODUCTS[] = []
  forYouProduct:PRODUCTS[] = []

  ngOnInit(): void {
    this.appService.getWishListProducts().subscribe(wishlists => {
      this.products = wishlists
    })

    this.appService.wishListEventEmit.subscribe(wishlist => {
      this.noOfWishlist = wishlist.length
    })

    this.noOfWishlist = this.appService.wishListCart.length

    this.appService.displayAllProducts().subscribe(product => {
      let productArray = [...product]
      this.shuffledProducts(productArray)
    })
  }

  //shuffle array function
  shuffledProducts(product:PRODUCTS[]){
    let current = product.length, value, index;

    // While there remain elements to shuffle...
    while (current !== 0) {
      // Pick a remaining element...
      index = Math.floor(Math.random() * current);
      current--;

      // And swap it with the current element.
      value = product[current];
      product[current] = product[index];
      product[index] = value;
    }

    this.forYouProduct = product
  }

  //remove product from wishlist
  removeFromWishList(product:PRODUCTS){
    this.appService.getWishListProducts().subscribe(products => {
      this.appService.removeProductFromWishList(product,products)
    })
  }

  moveWishlist(products: PRODUCTS[]){

    //move wishlist to product cart
    products.forEach(product => {
      this.appService.addProductToCart(product)
    })

    //empty the wishlist array
    products.length = 0
    this.noOfWishlist = products.length

    //emit wishlist length
    this.appService.wishLength()
  }
}
