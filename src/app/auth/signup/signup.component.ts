import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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

  isFormValidAndSent: boolean = false

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  ngOnInit() {
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value)
      .subscribe(
        (res) => {
          if (res.data) {
            this.isFormValidAndSent = true
            this.signupForm.reset();

            setTimeout(() => {
              this.isFormValidAndSent = false
              this.router.navigate(['login']);
            }, 3000)

          }
        },
        err => {
          if (Array.isArray(err.error)) {

            for (const errElement of err.error) {
              const formControl = this.signupForm.get(errElement.param);

              if (formControl) {
                formControl.setErrors({
                  serverError: {
                    errElement, message: errElement.msg
                  }
                });
              }
            }

          } else {
            Object.keys(err.error.error.errors).forEach(prop => {
              const formControl = this.signupForm.get(prop);
              if (formControl) {
                formControl.setErrors({
                  serverError: err.error.error.errors[prop]
                });
              }
            })
          }
        });
  }
}
