import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppService } from './AppService/app.service';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AppService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'aboMart';

  constructor(){}

  ngOnInit(): void {
    
  }

  hideMenu: boolean
  display(value:boolean){
    this.hideMenu = value
  }
}
