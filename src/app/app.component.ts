import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from './AppService/app.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AppService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'aboMart';

  constructor(private appService: AppService){}

  ngOnInit(): void {
    // this.display(this.hideMenu)
    console.log(this.appService.flashSaleCart)
  }

  hideMenu: boolean
  display(value:boolean){
    this.hideMenu = value
  }
}
