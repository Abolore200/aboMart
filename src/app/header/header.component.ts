import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private appService: AppService){}
  @ViewChild('removeNavBar') removeNavBar: ElementRef

  languages:string[] = []

  hideMenu:boolean = false

  a:string = 'Abolore'
  ninePlus:any
  ngOnInit(): void {
    this.languages = this.appService.languages
    this.appService.pushCart(this.a)
    this.number = this.appService.displayCart.length
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

  number:number
}
