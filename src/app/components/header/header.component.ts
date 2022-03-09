import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['a.active{ background-image: none !important; border-bottom: 2px solid currentColor !important;}']
})
export class HeaderComponent {

  constructor(
    public authService: AuthService
  ) {
  }

  logout() {
    this.authService.doLogout()
  }

}
