import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../enviroments/environment';
import { RegisterCustomerPayload, RegisterCustomerResp } from './models/register.model';
import { Observable } from 'rxjs';
import { LoginPayload, LoginResp } from './models/login.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  
  constructor(private http: HttpClient) { }

  login(body: LoginPayload): Observable<LoginResp>{
    return this.http.post<LoginResp>(`${baseURL}/BigBasket/Login`,body);
  }

  registerCustomer(body: RegisterCustomerPayload): Observable<RegisterCustomerResp>{
    return this.http.post<RegisterCustomerResp>(`${baseURL}/BigBasket/RegisterCustomer`,body);
  }
}
