import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public counter = 0;
  isOnline: boolean;

  constructor(
    private titleService: Title
  ) {
    titleService.setTitle('Car rental')

    this.isOnline = navigator.onLine;
  }

  ngOnInit() {
  }


  fireEvent() {
    console.log('fireEvent on app-root')
    this.counter++;
  }

  testLog(msg: any = 'test log') {
    console.log(msg)
  }
}
