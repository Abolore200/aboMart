import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { PRODUCTS } from '../AppModel/app.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private appService: AppService){}
  @ViewChildren('cartContainer') cartContainer! : QueryList<any>

  cartProducts: PRODUCTS[] = []
  noOfCart:number
  totalAmountOfCart:number

  ngOnDestroy(): void {
    this.appService.getProductCart().subscribe(products => {
      products.forEach(product => {
        
      })
    })
  }

  ngOnInit(): void {
    this.appService.getProductCart().subscribe(products => {
      this.cartProducts = products
      this.noOfCart = products.length

      if(products.length !== 0){
        this.totalAmountOfCart = products.map(i =>
          i.price * i.quantity
        )
        .reduce((a, b) => a + b)
      }
    })

    this.appService.productCartEmit.subscribe(products => {
      this.noOfCart = products.length
    })
  }

  ngAfterViewInit(): void {
    
  }

  //Increase quantity
  increaseQuatity(cart:PRODUCTS){

    //increase quantity of product
    this.appService.increaseQuantity(cart)
    this.appService.getProductCart().subscribe(products => {

      //add quantity and price on click
      this.totalAmountOfCart = products.map(i =>
        i.price * i.quantity
      )
      .reduce((a, b) => a + b)
    })
  }

  //Decrease qunatity
  decreaseQuantity(cart:PRODUCTS,cartContainer:HTMLDivElement){

    //decrease quantity of product
    this.appService.decreaseQuantity(cart,cartContainer)

    //
    this.appService.getProductCart().subscribe(products => {
      //subtract quantity and price on click
      this.totalAmountOfCart = products.map(i =>
        i.price * i.quantity
      )
      .reduce((a, b) => a + b)
    })
  }

  //Remove total price product from Cart
  removeProduct(cart:PRODUCTS){
    this.appService.getProductCart().subscribe(products => {
      this.appService.removeProductFromCart(cart,products)
      if(products.length !== 0){
        this.totalAmountOfCart = products.map(i =>
          i.price * i.quantity
        )
        .reduce((a, b) => a + b)
      }
    })
  }
}
