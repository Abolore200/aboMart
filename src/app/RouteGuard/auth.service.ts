import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
