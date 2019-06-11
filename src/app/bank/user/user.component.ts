import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

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
