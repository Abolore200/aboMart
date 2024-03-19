import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService){}

  hide:boolean = false
  showPassword:boolean = false

  @ViewChild('password') Password:ElementRef
  @ViewChild('blurName') BlurName:ElementRef
  @ViewChild('blurEmail') BlurEmail:ElementRef
  @ViewChild('blurPassword') BlurPassword:ElementRef

  loginimg:string
  ngOnInit(): void {
    this.loginimg = this.appService.signupImage
  }
  showPass(){
    if(this.showPassword === false){
      this.showPassword = true
      this.Password.nativeElement.type = "text"
    } else {
      this.showPassword = false
      this.Password.nativeElement.type = "password"
    }
  }

  //
  nameInput:string = ''
  emailInput:string = ''
  passwordInput:string = ''

  formBlurName(){
    if(this.nameInput == ''){
      this.BlurName.nativeElement.style.borderBottomColor = 'red'
    }
  }

  //
  formBlurEmail(){
    if(this.emailInput == ''){
      this.BlurEmail.nativeElement.style.borderBottomColor = 'red'
    }
  }

  //
  formBlurPassword(){
    if(this.passwordInput == ''){
      this.BlurPassword.nativeElement.style.borderBottomColor = 'red'
    }
  }

  accountIcon:boolean = true
  loginAccount(){
    this.appService.loginEmit.emit(this.accountIcon)
  }
}
