import { Component, ElementRef, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { HeaderComponent } from '../header/header.component';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../AppService/http.service';
import { RegisterCustomerPayload } from '../AppService/models/register.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {

  constructor(private appService: AppService, private router: Router, private httpSrv: HttpService){}

  signupimg:string
  ngOnInit(): void {
    this.signupimg = this.appService.signupImage
  }

  hide:boolean = false
  showPassword:boolean = false

  showPass(password: HTMLInputElement){
    console.log(password)
    if(this.showPassword === false){
      this.showPassword = true
      password.type = "text"
    } else {
      this.showPassword = false
      password.type = "password"
    }
  }

  formSubmit(form: NgForm){
    const payload: RegisterCustomerPayload = {
      CustId: 0,
      Password: form.value['password'],
      Name: form.value['name'],
      MobileNo: form.value['phonenumber'],
    }

    this.httpSrv.registerCustomer(payload).subscribe({
      next: (res) => {
        if(res.result){
          this.router.navigate([''])
        }
        alert(res.message);
      }, 
      error: (error) => {
        alert(error);
      }
    })
  }
  
}
