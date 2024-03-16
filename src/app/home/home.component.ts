import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { PRODUCTS } from '../AppModel/app.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private appService: AppService){}

  @ViewChild('heart') heart: ElementRef

  days:number
  hours:number
  minutes:number
  seconds:number

  products:PRODUCTS[] = []

  ngOnInit(): void {
    const day = new Date().getDate()
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    const second = new Date().getSeconds()

    this.days = day
    this.hours = hour
    this.minutes = minute
    this.seconds = second

    this.products = this.appService.flashSaleCart
  }

  hideMenu:boolean = false
  displaySideMenu(){
    if(this.hideMenu === false){
      this.hideMenu = true
    } else {
      this.hideMenu = !this.hideMenu
    }
  }

  toggleWishListBtn:boolean = false
  addToWishList(product:PRODUCTS,element:HTMLElement){
    if(element.classList.contains('fa-regular')){
      if(element.classList.contains('fa-solid')){
        element.classList.remove('fa-solid')
      } else {
        element.classList.add('fa-solid')
        this.appService.pushProductToWishList(product)
      }
    }
  }
}
