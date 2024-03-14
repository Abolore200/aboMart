import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../AppService/app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  constructor(private appService: AppService){}

  currentYear:number
  qrcode:string

  ngOnInit(): void {
    this.qrcode = this.appService.qrcode

    const year = new Date().getFullYear()
    this.currentYear = year
  }
}
