import { Component, OnInit } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { PRODUCTS } from '../AppModel/app.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  constructor(private appService: AppService){}

  noOfWishlist:number
  products: PRODUCTS[] = []

  ngOnInit(): void {
    this.appService.getWishListProducts().subscribe(wishlists => {
      this.products = wishlists
    })

    this.appService.wishListEventEmit.subscribe(wishlist => {
      this.noOfWishlist = wishlist.length
    })

    this.noOfWishlist = this.appService.wishListCart.length
  }

  //remove product from wishlist
  addToWishList(product:PRODUCTS){
    this.appService.getWishListProducts().subscribe(products => {
      this.appService.removeProductFromWishList(product,products)
    })
  }
}
