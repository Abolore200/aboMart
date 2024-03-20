import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
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
  productName:string | boolean
  displayAccount:boolean

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

    // DISPLAY PRODUCT NAME ADDED TO CART 
    this.appService.productNameEmit.subscribe(name => {
      if(name){
        this.productName = name

        setTimeout(() => {
          this.productName = false
        },1000)
      }
    })

    // DISPLAY ACCOUNT ICON WHEN TRUE
    this.appService.loginEmit.subscribe(login => {
      this.displayAccount = login
    })
  }

  @Output() display = new EventEmitter<boolean>()


  //toggle / display menu category when clicked
  toggleMenu(){
    if(this.hideMenu === false){
      this.hideMenu = true
      this.display.emit(this.hideMenu)
    } else {
      this.hideMenu = false
      this.display.emit(this.hideMenu)
    }
  }


  //on click, hide menu from screen
  hideNavBar(){
    if(this.removeNavBar.nativeElement.classList.contains('absolute')){
      this.removeNavBar.nativeElement.classList.remove('absolute')
    }
    this.hideMenu = false
    this.display.emit(this.hideMenu)
  }


  //on click, hide menu category from screen
  removeMenu(){
    if(this.hideMenu === true){
      this.hideMenu = false
      this.display.emit(this.hideMenu)
    }
  }
}
