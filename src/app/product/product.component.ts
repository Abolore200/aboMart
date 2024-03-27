import { AfterViewInit, Component, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PRODUCTS } from '../AppModel/app.model';
import { AppService } from '../AppService/app.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit, AfterViewInit {
  constructor(private activatedRoute: ActivatedRoute, private appService: AppService){}
  @ViewChildren('productContainer') productContainer! : QueryList<any>

  product:any
  productID:any

  productColor:string = 'white'
  productSize:string = 'medium'

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.productID = param.get('id')
      this.product = this.appService.allProducts.find(x => x.id == this.productID)
    })
  }

  ngAfterViewInit(): void {
    this.productContainer.forEach(prod => {

      //wishlist //icon should keep class if available in array
      this.appService.getWishListProducts().subscribe(products => {
        products.forEach(product => {
          let {id} = product
          let heart = prod.nativeElement.querySelector(`[data-id="${id}"]`)
          if(heart){
            heart.classList.add('fa-solid')
          }
        })
      })

      //cart add to cart btn should keep class if available in array
      this.appService.getProductCart().subscribe(products => {
        products.forEach(product => {
          let {id} = product
          let {quantity} = product
          let quantityBtn = prod.nativeElement.querySelector(`[cart-id="${id}"]`)
          let buyBtn = prod.nativeElement.querySelector('.buy-now-btn')
          if(quantityBtn && buyBtn){
            quantityBtn.classList.add('show')
            buyBtn.classList.add('hide')
          }

          let card = prod.nativeElement.querySelector(`[quantity-id="${id}"]`)
          if(card){
            card.innerHTML = quantity
          }
        })
      })

    })
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

  //add product to cart
  addToCart(productContainer:HTMLDivElement,product:PRODUCTS){
    const buyBtn = productContainer.querySelector('.buy-now-btn')
    const quantityBtn = productContainer.querySelector('.quantity-btn-container')

    //add classlist to buybtn and quantity btn if it returns true
    if(buyBtn && quantityBtn){
      buyBtn.classList.add('hide')
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
    console.log(product)

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
