import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private appService: AppService){}

  days:number
  hours:number
  minutes:number
  seconds:number

  products:{name:string,price:number,rating:number,image:string,review:number,discount:number,old:number}[] = []

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
}
