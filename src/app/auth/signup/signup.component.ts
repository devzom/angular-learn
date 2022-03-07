import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [],
})
export class SignupComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  signupForm: FormGroup;


  ngOnInit() {
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.data) {
        this.signupForm.reset();
        this.router.navigate(['login']);
      }
    });
  }
}
