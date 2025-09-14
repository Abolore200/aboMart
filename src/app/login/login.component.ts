import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';
import { AuthService } from '../RouteGuard/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../AppService/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService, private auth: AuthService, private router: Router, private httpSrv: HttpService){}

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
    const payload = {
      UserName: String(form.value.phonenumber),
      UserPassword: form.value.password,
    }

    this.httpSrv.login(payload).subscribe({
      next: (res) => {
        if(res.result){
          // sotre data to local storage
          localStorage.setItem('userData', JSON.stringify(res.data));
          //display profile icon when logged in
          this.appService.loginEmit.emit(this.accountIcon);
          //authenticate login page and proceed to checkout page
          this.auth.logIn()
          this.router.navigate([''])
        } else {
          alert(res.message);
        }

      },
      error: (error) => {
        console.log(error)
        alert(error?.error?.UserName[0] ?? error?.error?.UserPassword[0] ?? 'An error occurred');
      }
    })


  }
}
