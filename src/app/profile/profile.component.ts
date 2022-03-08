import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [],
})

export class ProfileComponent implements OnInit {
  currentUser: any = {};

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {

    // userId can be read from URl param of from provided storage by AuthService
    const userId = this.actRoute.snapshot.paramMap?.get('id');
    this.authService.getUserProfile(userId)
      .subscribe((res) => {
          this.currentUser = res.data;
        },
        error => {
          console.log({error})
          this.authService.doLogout()
        }
      )
  }

  ngOnInit() {
  }
}
