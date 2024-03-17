import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation, input } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';

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

  number:number
  ngOnInit(): void {
    this.languages = this.appService.languages
    this.appService.wishListEventEmit.subscribe(value => {
      this.number = value.length
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
