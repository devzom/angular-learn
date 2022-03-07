import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['a.active{ background-image: none !important; border-bottom: 2px solid currentColor !important;}']
})
export class HeaderComponent implements OnChanges {
  // public otherCounter = 0

  @Input() testVariable: any;

  constructor(
    public authService: AuthService
  ) {
  }

  logout() {
    this.authService.doLogout()
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('fire ngOnChanges')
    //
    // console.log(changes)
    //
    // // @ts-ignore
    // if (!changes.testVariable.firstChange) {
    //   this.otherCounter++
    // }
  }

}
