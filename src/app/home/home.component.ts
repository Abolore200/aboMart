import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChildren, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { PRODUCTS } from '../AppModel/app.model';
import { Observable, TimeoutConfig, interval, map, shareReplay } from 'rxjs';
import { Time } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  constructor(private appService: AppService){
    
  }

  @ViewChildren('productContainer') productContainer! : QueryList<any>

  days:number
  hours:number
  minutes:number
  seconds:number

  flashProducts:PRODUCTS[] = []
  bestProducts:PRODUCTS[] = []
  exploreProducts:PRODUCTS[] = []
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

    this.appService.displayAllProducts().subscribe(product => {
      this.flashProducts = product.filter(product => product.category === 'flash')
      this.bestProducts = product.filter(product => product.category === 'best')
      this.exploreProducts = product.filter(product => product.category === 'explore')

      //shuffle / randomise the array
      let productArray = [...product]
      this.shuffledProducts(productArray)
    })


    this.appService.getCategory().subscribe(category =>{
      this.categories = category
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
  }

  ngAfterViewInit(): void {

    this.productContainer.forEach(prod => {

      //wishlist, icon should keep class if available in array
      this.appService.getWishListProducts().subscribe(products => {
        products.forEach(product => {
          let {id} = product
          let heart = prod.nativeElement.querySelector(`[data-id="${id}"]`)
          if(heart){
            heart.classList.add('fa-solid')
          }
        })
      })

      //cart, quantity btn should keep class if available in array
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
  addProductToWishList(productContainer:HTMLDivElement,product:PRODUCTS){
    let heart = productContainer.querySelector('.fa-heart')

    //if heart is true, toggle 'fa-solid'
    if(heart?.classList.contains('fa-heart')){
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
  displayProduct(product:HTMLDivElement){
    console.log(product)
  }

  //add product to cart
  addToCart(productContainer:HTMLDivElement,product:PRODUCTS){
    const cartBtn = productContainer.querySelector('.add-to-cart-btn')
    const quantityBtn = productContainer.querySelector('.quantity-btn-container')

    //add classlist to cartbtn and quantity btn if it returns true
    if(cartBtn && quantityBtn){
      cartBtn.classList.add('hide')
      quantityBtn.classList.add('show')
    }

    //
    this.appService.addProductToCart(product)

    //emit product name
    this.appService.getProductName(product.name)
  }

  //decrease cart quantity
  decreaseCartQuantity(product:PRODUCTS,productContainer:HTMLDivElement){

    //decrease quantity from cart when clicked
    this.appService.decreaseQuantity(product,productContainer)

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