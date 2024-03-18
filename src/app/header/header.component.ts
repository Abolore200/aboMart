import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

  constructor(private appService: AppService){}
  @ViewChild('removeNavBar') removeNavBar: ElementRef

  languages:string[] = []

  hideMenu:boolean = false

  wishListNumber:number
  cartNumber: number
  ngOnInit(): void {
    this.languages = this.appService.languages

    //WISHLIST NUMBER
    this.appService.wishListEventEmit.subscribe(value => {
      this.wishListNumber = value.length
    })

    //CART NUMBER
    this.appService.productCartEmit.subscribe(value => {
      this.cartNumber = value.length
    })
  }

  @Output() display = new EventEmitter<boolean>()

  displayMenu(){
    if(this.hideMenu === false){
      this.hideMenu = true
      this.display.emit(this.hideMenu)
    } else {
      this.hideMenu = false
      this.display.emit(this.hideMenu)
    }
  }

  hideNavBar(){
    if(this.removeNavBar.nativeElement.classList.contains('absolute')){
      this.removeNavBar.nativeElement.classList.remove('absolute')
    }
    this.hideMenu = false
    this.display.emit(this.hideMenu)
  }
}
