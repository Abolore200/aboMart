import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { PRODUCTS } from '../AppModel/app.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private appService: AppService, private activatedRoute: ActivatedRoute){}

  @ViewChild('heart') productContainer! : ElementRef

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

    this.appService.getFlashSalesProducts().subscribe(product => {
      this.products = product
    })

    // this.faSolid = this.appService.returnFavouriteColor()
  }

  hideMenu:boolean = false
  displaySideMenu(){
    if(this.hideMenu === false){
      this.hideMenu = true
    } else {
      this.hideMenu = !this.hideMenu
    }
  }

  faSolid:string = ''

  addToWishList(product:PRODUCTS,element:HTMLElement){
    if(element.classList.contains('fa-regular')){
      element.classList.toggle('fa-solid')
      if(element.classList.contains('fa-solid')){
        this.appService.pushProductToWishList(product)
        // 
        // this.appService.favourite(this.faSolid)
        // element.classList.add('fa-solid')

      } else {
        this.appService.getWishListProducts().subscribe(products => {
          this.appService.removeProductFromWishList(product,products)
        })
      }
    }
  }
}
