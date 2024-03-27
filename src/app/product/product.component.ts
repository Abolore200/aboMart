import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PRODUCTS } from '../AppModel/app.model';
import { AppService } from '../AppService/app.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private appService: AppService){}

  product:any
  productID:any

  productColor:string = 'white'
  productSize:string = 'medium'

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.productID = param.get('id')
      this.product = this.appService.allProducts.find(x => x.id == this.productID)

      console.log(this.product)
    })
  }

  getSize(){
    console.log(this.productSize)
  }
}
