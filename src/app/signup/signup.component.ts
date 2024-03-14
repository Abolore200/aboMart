import { Component, ElementRef, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {

  constructor(private appService: AppService){}

  @ViewChild('password') Password:ElementRef
  @ViewChild('blurName') BlurName:ElementRef
  @ViewChild('blurEmail') BlurEmail:ElementRef
  @ViewChild('blurPassword') BlurPassword:ElementRef

  signupimg:string
  ngOnInit(): void {
    this.signupimg = this.appService.signupImage
  }

  hide:boolean = false
  showPassword:boolean = false

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

  
}
