import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isOnline: boolean;

  constructor(
    private titleService: Title
  ) {
    titleService.setTitle('Car rental')

    this.isOnline = navigator.onLine;
  }

  ngOnInit() {

  }

  testLog(msg: any = 'test log') {
    console.log(msg)
  }
}
