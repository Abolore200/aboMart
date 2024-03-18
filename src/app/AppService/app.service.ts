import { ElementRef, EventEmitter, Injectable } from '@angular/core';
import { PRODUCTS } from '../AppModel/app.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  languages = ['english', 'french', 'arabic']
  qrcode = 'assets/images/footerbarcode.png'
  signupImage = 'assets/images/signup.jpg'

  flashSaleCart = [
    {id:101,name:'HAVIT HV-G92 Gamepad',price:120,rating:5,image:'assets/images/gamepad.svg',review:88,discount:40,old:160,quantity:1},
    {id:102,name:'AK-900 Wired Keyboard',price:960,rating:4,image:'assets/images/ak900.svg',review:75,discount:35,old:1190,quantity:1},
    {id:103,name:'IPS LCD Gaming Monitor',price:370,rating:5,image:'assets/images/ipsmonitor.svg',review:99,discount:30,old:400,quantity:1},
    {id:104,name:'S-Series Comfort Chair',price:375,rating:5,image:'assets/images/chair.svg',review:99,discount:25,old:400,quantity:1}
  ]

  getFlashSalesProducts() :Observable<PRODUCTS[]>{
    return of(this.flashSaleCart)
  }

  //ADD TO WISHLIST

  wishListCart: PRODUCTS[] = []

  wishListEventEmit = new EventEmitter<PRODUCTS[]>()

  pushProductToWishList(product:PRODUCTS){
    this.wishListCart.push(
      {
        id:product.id,
        name:product.name,
        price:product.price,
        rating:product.rating,
        image:product.image,
        review:product.review,
        discount:product.discount,
        old:product.old,
        quantity:product.quantity
      }
    )
    this.wishListEventEmit.emit(this.wishListCart)
  }

  getWishListProducts(): Observable<PRODUCTS[]>{
    return of(this.wishListCart)
  }

  removeProductFromWishList(product:PRODUCTS, products:PRODUCTS[]){
    products.forEach((prodID, index) => {
      if(prodID.id === product.id){
        products.splice(index,1)
      }
    })
    this.wishListEventEmit.emit(this.wishListCart)
  }

  sellingProduct = [
    {id:105,name:'The North Coat',price:260,rating:5,image:'assets/images/north.svg',review:65,discount:0,old:350,quantity:1},
    {id:106,name:'Gucci Duffel Bag',price:960,rating:5,image:'assets/images/gucci.svg',review:65,discount:0,old:1190,quantity:1},
    {id:107,name:'RGB Liquid CPU Cooler',price:160,rating:5,image:'assets/images/rgbcooler.svg',review:65,discount:0,old:170,quantity:1},
    {id:108,name:'Small Bookshelf',price:360,rating:5,image:'assets/images/bookshelf.svg',review:65,discount:0,old:170,quantity:1}
  ]

  getSellingProducts() :Observable<PRODUCTS[]>{
    return of(this.sellingProduct)
  }

  //CATEGORY

  categoryFilter = [
    {name:'mobile',class:'fa-solid fa-mobile'},
    {name:'desktop',class:'fa-solid fa-desktop'},
    {name:'clock',class:'fa-solid fa-clock'},
    {name:'camera',class:'fa-solid fa-camera'},
    {name:'headphone',class:'fa-solid fa-headphones'},
    {name:'gamepad',class:'fa-solid fa-gamepad'}
  ]

  getCategory() :Observable<{name:string,class:string}[]>{
    return of(this.categoryFilter)
  }


  //ADD TO CART

  productCart: PRODUCTS[] = []

  productCartEmit = new EventEmitter<PRODUCTS[]>()

  addProductToCart(product:PRODUCTS){
    this.productCart.push(
      {
        id:product.id,
        name:product.name,
        price:product.price,
        rating:product.rating,
        image:product.image,
        review:product.review,
        discount:product.discount,
        old:product.old,
        quantity:product.quantity
      }
    )
    this.productCartEmit.emit(this.productCart)
  }

  getProductCart() :Observable<PRODUCTS[]>{
    return of(this.productCart)
  }

  removeProductFromCart(product:PRODUCTS, products:PRODUCTS[]){
    products.forEach((prodID, index) => {
      if(prodID.id === product.id){
        products.splice(index,1)
      }
    })
    this.productCartEmit.emit(this.productCart)
  }

  //Ng AFter View Init
  displayClickedProduct(product:PRODUCTS,prod:any){
    
  }
}
