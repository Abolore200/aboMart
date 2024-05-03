import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { AuthService } from '../RouteGuard/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService, private auth: AuthService, private router: Router){}

  hide:boolean = false
  toggleEye:boolean = false

  loginimg:string
  ngOnInit(): void {
    this.loginimg = this.appService.signupImage
  }
  showPass(password: HTMLInputElement){
    if(this.toggleEye === false){
      this.toggleEye = true
      password.type = "text"
    } else {
      this.toggleEye = false
      password.type = "password"
    }
  }



  accountIcon:boolean = true
  loginAccount(form: NgForm){
    //display profile icon when logged in
    this.appService.loginEmit.emit(this.accountIcon)

    //authenticate login page and proceed to checkout page
    this.auth.logIn()

    this.router.navigate([''])
  }
}
