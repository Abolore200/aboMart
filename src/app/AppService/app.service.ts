import { EventEmitter, Injectable } from '@angular/core';
import { PRODUCTS } from '../AppModel/app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  languages = ['english', 'french', 'arabic']
  qrcode = 'assets/images/footerbarcode.png'
  signupImage = 'assets/images/signup.jpg'

  // displayCart: {}[] = []

  // pushCart(num:string){
  //   // this.displayCart.push({names:num})
  // }

  flashSaleCart = [
    {name:'HAVIT HV-G92 Gamepad',price:120,rating:5,image:'assets/images/gamepad.svg',review:88,discount:40,old:160},
    {name:'AK-900 Wired Keyboard',price:960,rating:4,image:'assets/images/ak900.svg',review:75,discount:35,old:1190},
    {name:'IPS LCD Gaming Monitor',price:370,rating:5,image:'assets/images/ipsmonitor.svg',review:99,discount:30,old:400},
    {name:'S-Series Comfort Chair',price:375,rating:5,image:'assets/images/chair.svg',review:99,discount:25,old:400},
  ]

  wishListCart: {}[] = []

  wishListEventEmit = new EventEmitter<{}>()

  pushProductToWishList(product:PRODUCTS){
    this.wishListCart.push(
      {
        name:product.name,
        price:product.price,
        rating:product.rating,
        image:product.image,
        review:product.review,
        discount:product.discount,
        old:product.old
      }
    )
    this.wishListEventEmit.emit(this.wishListCart)
  }

  removeProductFromWishList(product:PRODUCTS, productID:any){
    
  }
}
