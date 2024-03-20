import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChildren, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { PRODUCTS } from '../AppModel/app.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  constructor(private appService: AppService){
    appService.displayAllProducts().subscribe(product => {
      this.products = product
    })
  }

  @ViewChildren('productContainer') productContainer! : QueryList<any>

  days:number
  hours:number
  minutes:number
  seconds:number

  products:PRODUCTS[] = []
  categories:{name:string,class:string}[] = []

  ngOnInit(): void {
    const day = new Date().getDate()
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    const second = new Date().getSeconds()

    this.days = day
    this.hours = hour
    this.minutes = minute
    this.seconds = second

    // this.appService.displayAllProducts().subscribe(product => {
    //   this.products = product
    // })

    this.appService.getCategory().subscribe(category =>{
      this.categories = category
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
          let {quantity} = product
          let quantityBtn = prod.nativeElement.querySelector(`[cart-id="${id}"]`)
          if(quantityBtn){
            quantityBtn.classList.add('show')
          }

          let card = prod.nativeElement.querySelector(`[quantity-id="${id}"]`)
          if(card){
            card.innerHTML = quantity
          }
        })
      })
    })

    this.appService.getProductCart().subscribe(products => {
      if(products){
        products.forEach(product => {
         if(product){
          let {id} = product
          this.productContainer.forEach(productID => {
            let quantityID = productID.nativeElement.querySelector(`[quantity-id="${id}"]`)
            if(quantityID){
              let attr = quantityID.getAttribute('quantity-id')
              
            }
          })
         }
        })
      }
    })
  }

  //NG ON CHANGES
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  ngOnDestroy(): void {
    
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

  //add product to cart
  addToCart(productContainer:HTMLDivElement,product:PRODUCTS){
    const cartBtn = productContainer.querySelector('.add-to-cart-btn')
    const quantityBtn = productContainer.querySelector('.quantity-btn-container')

    //add classlist to cartbtn and quantity btn if it returns true
    if(cartBtn){
      cartBtn.classList.add('hide')
      quantityBtn?.classList.add('show')
    }

    console.log(product)

    //
    this.appService.addProductToCart(product)
  }

  //decrease cart quantity
  decreaseCartQuantity(product:PRODUCTS){

    //decrease quantity from cart when clicked
    this.appService.decreaseQuantity(product)

  //     cartBtn.classList.remove('hide')
  //     quantityBtn?.classList.remove('show')


    //update quantity value when changed
    this.appService.getProductCart().subscribe(prod => {
      prod.forEach(productCart => {
        let {id} = productCart
        let {quantity} = productCart
        this.productContainer.forEach(lists => {
          let quantityValue = lists.nativeElement.querySelector(`[quantity-id="${id}"]`)
          if(quantityValue){
            quantityValue.innerHTML = quantity
          }
        })
      })
    })
  }

  //increase cart quantity
  increaseCartQuantity(product:PRODUCTS){

    //increase quantity from cart when clicked
    this.appService.increaseQuantity(product)

    //update quantity value when changed
    this.appService.getProductCart().subscribe(prod => {
      prod.forEach(productCart => {
        let {id} = productCart
        let {quantity} = productCart
        this.productContainer.forEach(lists => {
          let quantityValue = lists.nativeElement.querySelector(`[quantity-id="${id}"]`)
          if(quantityValue){
            quantityValue.innerHTML = quantity
          }
        })
      })
    })
  }
}