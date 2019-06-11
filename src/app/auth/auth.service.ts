import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authTokenCheck = new Subject<boolean>();
  authTokenDataCheck = false;
  userIds: number;
  url = 'myurl';
  private getUserDetails = new Subject<any>();
  constructor(private http: HttpClient, private route: Router) { }


  loginUser(loginForm) {
    console.log(loginForm, 'here');
    this.http.post("http://10.117.189.170:9090/INGTMRWModelBank/api/users", loginForm).subscribe(
      data => {
        console.log(data);
        this.route.navigate(['/']);
      }
    )
  }

  getUserInfo() {
   return this.getUserDetails.asObservable();
  }

  getAccountInfo() {
      this.http.get("http://10.117.189.73:9090/INGTMRWModelBank/api/customers/ing00002").subscribe(
        (data) => {
         this.getUserDetails.next(data);
         console.log(data);
        }
      )
  }
}
