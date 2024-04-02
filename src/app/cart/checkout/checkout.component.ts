import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../AppService/app.service';
import { PRODUCTS } from '../../AppModel/app.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CheckoutComponent implements OnInit {
  constructor(private appService: AppService){}

  products:PRODUCTS[] = []
  total:number = 0
  totalAmount:number | string = 0

  ngOnInit(): void {
    this.appService.getProductCart().subscribe(cart => {
      if(cart.length != 0){

        //products 
        this.products = cart

        //sum price and quantity of each product all together
        this.total = cart
        .map(i => i.price * i.quantity)
        .reduce((a,b) => a + b)

        //convert total to currency
        this.totalAmount = new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN"
        }).format(this.total)
      }
    })
  }
}
