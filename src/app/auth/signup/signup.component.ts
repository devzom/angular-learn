import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {pipe} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [],
})
export class SignupComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public router: Router
  ) {
  }

  formIsValid: boolean | null = null

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.nullValidator, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.nullValidator, Validators.minLength(8)]),
  })

  ngOnInit() {
  }

  registerUser() {

    if (this.signupForm.status == "INVALID") {
      this.formIsValid = false
      return
    }

    this.authService.signUp(this.signupForm.value)
      .subscribe(
        (res) => {
          if (res.data) {
            this.signupForm.reset();
            this.router.navigate(['login']);
          }
        });
  }
}
