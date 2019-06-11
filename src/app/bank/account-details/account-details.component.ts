import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
profiles = {};
listOftrns: [];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAccountInfo();
    this.authService.getUserInfo().subscribe(
      profile => {
        console.log(profile);
        this.profiles = profile;
      }
    )

    this.authService.getTransactionInfo();
    this.authService.getTransactionDetails().subscribe(
      data => {
        console.log(data, 'Raj nish');
        this.listOftrns = data;
      }
    )
  }

  reference(refe) {
    console.log(refe);
  }

}
