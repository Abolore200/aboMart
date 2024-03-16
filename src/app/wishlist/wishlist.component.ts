import { Component, OnInit } from '@angular/core';
import { AppService } from '../AppService/app.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  constructor(private appService: AppService){}

  ngOnInit(): void {
    console.log(this.appService.wishListCart)
  }
}
