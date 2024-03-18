import { AfterViewInit, Component, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { PRODUCTS } from '../AppModel/app.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private appService: AppService){}

  @ViewChildren('productContainer') productContainer! : QueryList<any>

  days:number
  hours:number
  minutes:number
  seconds:number

  products:PRODUCTS[] = []
  sellingProducts: PRODUCTS[] = []

  categories: {name:string,class:string}[] = []

  ngOnInit(): void {
    const day = new Date().getDate()
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    const second = new Date().getSeconds()

    this.days = day
    this.hours = hour
    this.minutes = minute
    this.seconds = second

    this.appService.getFlashSalesProducts().subscribe(product => {
      this.products = product
    })

    this.appService.getCategory().subscribe(category =>{
      this.categories = category
    })

    this.appService.getSellingProducts().subscribe(selling => {
      this.sellingProducts = selling
    })
  }

  ngAfterViewInit(): void {

    //icon should keep class if available in array
    this.productContainer.forEach(prod => {

      //wishlist
      this.appService.getWishListProducts().subscribe(products => {
        products.forEach(product => {
          let {id} = product
          let heart = prod.nativeElement.querySelector(`[data-id="${id}"]`)
          if(heart){
            heart.classList.add('fa-solid')
          }
        })
      })

      //cart
      this.appService.getProductCart().subscribe(products => {
        products.forEach(product => {
          let {id} = product
          let quantityBtn = prod.nativeElement.querySelector(`[cart-id="${id}"]`)
          if(quantityBtn){
            quantityBtn.classList.add('show')
          }
        })
      })
    })
  }

  hideMenu:boolean = false
  displaySideMenu(){
    if(this.hideMenu === false){
      this.hideMenu = true
    } else {
      this.hideMenu = !this.hideMenu
    }
  }

  //add product to wishlist
  getProduct(productContainer:HTMLDivElement,product:PRODUCTS){
    let heart = productContainer.querySelector('.fa-regular')

    //if heart is true, toggle 'fa-solid'
    if(heart?.classList.contains('fa-regular')){
      heart.classList.toggle('fa-solid')

      //if 'fa-solid' return true, add product to pushProduct()
      if(heart.classList.contains('fa-solid')){

          //add product to wishlist
        this.appService.pushProductToWishList(product)
      } else {

        // if 'fa-solid' return false, remove product from wishlist
        this.appService.getWishListProducts().subscribe(products => {
          this.appService.removeProductFromWishList(product,products)
        })
      }
    }
  }

  //display product
  displayProduct(product:PRODUCTS){

  }

  addToCart(productContainer:HTMLDivElement,product:PRODUCTS){
    const cartBtn = productContainer.querySelector('.add-to-cart-btn')
    const quantityBtn = productContainer.querySelector('.quantity-btn-container')
    if(cartBtn){
      cartBtn.classList.add('hide')
      quantityBtn?.classList.add('show')
    }

    //add product to cart
    this.appService.addProductToCart(product)
  }

  //
  quantityNumber:number = 1

  //decrease cart quantity
  decreaseCartQuanity(product:PRODUCTS,productContainer:HTMLDivElement){
    if(product.quantity === 1){
      const cartBtn = productContainer.querySelector('.add-to-cart-btn')
      const quantityBtn = productContainer.querySelector('.quantity-btn-container')
      if(cartBtn){
        cartBtn.classList.remove('hide')
        quantityBtn?.classList.remove('show')
      }

      //remove product from cart
      this.appService.getProductCart().subscribe(products => {
        this.appService.removeProductFromCart(product,products)
      })
      
    } else {
      product.quantity -= this.quantityNumber
    }
  }

  //increase cart quantity
  increaseCartQuantity(product:PRODUCTS){
    product.quantity += this.quantityNumber
  }
}