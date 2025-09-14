import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    // this.getInfo();
  }

  getInfo(){
    // const data = localStorage.getItem('userData');
    if(localStorage.getItem('userData')){
      this.logIn();
      this.authenticated();
    } else {
      this.logOut();
      this.authenticated();
    }
  }

  loggedIn:boolean = false

  logIn(){
    this.loggedIn = true
  }

  logOut(){
    this.loggedIn = false
  }

  authenticated(){
    return this.loggedIn
  }
}
