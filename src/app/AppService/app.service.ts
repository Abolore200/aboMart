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

  allProducts = [
    {id:101,name:'HAVIT HV-G92 Gamepad',price:120,rating:5,image:'assets/images/gamepad.svg',review:88,discount:40,old:160,quantity:1,category:'flash'},
    {id:102,name:'AK-900 Wired Keyboard',price:960,rating:4,image:'assets/images/ak900.svg',review:75,discount:35,old:1190,quantity:1,category:'flash'},
    {id:103,name:'IPS LCD Gaming Monitor',price:370,rating:5,image:'assets/images/ipsmonitor.svg',review:99,discount:30,old:400,quantity:1,category:'flash'},
    {id:104,name:'S-Series Comfort Chair',price:375,rating:5,image:'assets/images/chair.svg',review:99,discount:25,old:400,quantity:1,category:'flash'},
    {id:105,name:'The North Coat',price:260,rating:5,image:'assets/images/north.svg',review:65,discount:0,old:350,quantity:1,category:'best'},
    {id:106,name:'Gucci Duffel Bag',price:960,rating:5,image:'assets/images/gucci.svg',review:65,discount:0,old:1190,quantity:1,category:'best'},
    {id:107,name:'RGB Liquid CPU Cooler',price:160,rating:5,image:'assets/images/rgbcooler.svg',review:65,discount:0,old:170,quantity:1,category:'best'},
    {id:108,name:'Small Bookshelf',price:360,rating:5,image:'assets/images/bookshelf.svg',review:65,discount:0,old:170,quantity:1,category:'best'},

    {id:109,name:'Breed Dry Dog Food',price:100,rating:3,image:'assets/images/dryfood.svg',review:35,discount:0,old:0,quantity:1,category:'explore'},
    {id:110,name:'CANON EOS DSLR Camera',price:360,rating:4,image:'assets/images/camera.svg',review:95,discount:0,old:0,quantity:1,category:'explore'},
    {id:111,name:'ASUS FHD Gaming Laptop',price:700,rating:5,image:'assets/images/laptop.svg',review:325,discount:0,old:0,quantity:1,category:'explore'},
    {id:112,name:'Curology Product Set',price:145,rating:4,image:'assets/images/curology.svg',review:45,discount:0,old:0,quantity:1,category:'explore'},
    {id:113,name:'Kids Electric Car',price:960,rating:5,image:'assets/images/mercedes.svg',review:65,discount:1,old:0,quantity:1,category:'explore'},
    {id:114,name:'Jr. Zoom Soccer Cleats',price:1160,rating:5,image:'assets/images/boots.svg',review:35,discount:0,old:0,quantity:1,category:'explore'},
    {id:115,name:'GP11 Shooter USB Gamepad',price:660,rating:4,image:'assets/images/gp11.svg',review:55,discount:1,old:0,quantity:1,category:'explore'},
    {id:116,name:'Quilted Satin Jacket',price:660,rating:4,image:'assets/images/jacket.svg',review:55,discount:0,old:0,quantity:1,category:'explore'},
    
  ]

  displayAllProducts() :Observable<PRODUCTS[]>{
    return of(this.allProducts)
  }

  //ADD TO WISHLIST

  wishListCart: PRODUCTS[] = []

  getWishListProducts(): Observable<PRODUCTS[]>{
    return of(this.wishListCart)
  }

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
        quantity:product.quantity,
        category:product.category
      }
    )
    this.wishListEventEmit.emit(this.wishListCart)
  }

  removeProductFromWishList(product:PRODUCTS, products:PRODUCTS[]){
    products.forEach((prodID, index) => {
      if(prodID.id === product.id){
        products.splice(index,1)
      }
    })
    this.wishListEventEmit.emit(this.wishListCart)
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
        quantity:product.quantity,
        category:product.category
      }
    )
    this.productCartEmit.emit(this.productCart)
  }

  getProductCart() :Observable<PRODUCTS[]>{
    return of(this.productCart)
  }

  removeProductFromCart(product:PRODUCTS, products:PRODUCTS[]){
    if(products.length !== 0){
      products.forEach((prodID, index) => {
        if(prodID.id === product.id){
          products.splice(index,1)
        }
      })
      product.quantity = 1
    }
    this.productCartEmit.emit(this.productCart)
  }

  //remove btn product
  removeBtnProductFromCart(product:PRODUCTS, products:PRODUCTS[]){
    if(products.length !== 0){
      products.forEach((prodID, index) => {
        if(prodID.id === product.id){
          products.splice(index,1)
        }
      })
    }
    this.productCartEmit.emit(this.productCart)
  }

  //Increase Quantity
  increaseQuantity(product:PRODUCTS){
    this.getProductCart().subscribe(products => {
      const item = products.find(item => item.id === product.id)
      if(item){
        item.quantity++
      }
    })
  }

  //Decrease Quantity
  decreaseQuantity(product:PRODUCTS,productContainer:HTMLDivElement){
    this.getProductCart().subscribe(products => {
      const item = products.find(item => item.id === product.id)
      if(item && item.quantity > 1){
        item.quantity--
      } else {

        //add classlist to cartbtn and quantity if quantity == 1
        const cartBtn = productContainer.querySelector('.add-to-cart-btn')
        const quantityBtn = productContainer.querySelector('.quantity-btn-container')

        //add classlist to cartbtn and quantity btn if it returns true
        if(cartBtn && quantityBtn){
          cartBtn.classList.remove('hide')
          quantityBtn.classList.remove('show')
        }

        //remove product from cart if quantity == 1
        this.removeBtnProductFromCart(product,products)
        
      }
    })
  }
  

  //Ng AFter View Init
  displayClickedProduct(product:PRODUCTS,prod:any){
    
  }

  //PRODUCT NAME EMIT
  // product emitter to header component
  productNameEmit = new EventEmitter<string>()

  //Emit product to header component on click
  getProductName(product:string){
    this.productNameEmit.emit(product)
  }

  //LOGIN TRUE EMIT 
  //login emitter to header component
  loginEmit = new EventEmitter<boolean>()

  //Emit TRUE to header component on click
  getLogin(value:boolean){
    this.loginEmit.emit(value)
  }
}
