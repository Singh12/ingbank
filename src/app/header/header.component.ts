import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isLogin = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfileOfUser().subscribe(
      authData => {
        this.isLogin = authData;
      }
    )
   this.isLogin = this.authService.getauthTokenData();
  }

  logout() {
    this.authService.logOut();
  }
}
