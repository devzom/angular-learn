import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: [],
})
export class SigninComponent {
  constructor(
    public authService: AuthService,
    public router: Router
  ) {
  }

  signinForm = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email], updateOn: 'blur'}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(5)], updateOn: 'blur'}),
  })


  loginUser() {
    this.authService.signIn(this.signinForm.value);
  }
}
