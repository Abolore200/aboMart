import { AfterViewInit, Component, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { PRODUCTS } from '../AppModel/app.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit, AfterViewInit {

  constructor(private appService: AppService){}
  @ViewChildren('cartContainer') cartContainer! : QueryList<any>

  cartProducts: PRODUCTS[] = []
  noOfCart:number

  ngOnInit(): void {
    this.appService.getProductCart().subscribe(products => {
      this.cartProducts = products
      this.noOfCart = products.length
    })
  }

  ngAfterViewInit(): void {
    this.cartContainer.forEach(carts => {
      this.appService.getProductCart().subscribe(products => {
        products.forEach(product => {
          
        })
      })
    })
  }
}
