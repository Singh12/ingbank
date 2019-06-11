import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
profiles = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAccountInfo();
    this.authService.getUserInfo().subscribe(
      profile => {
        console.log(profile);
        this.profiles = profile;
      }
    )
  }

}
