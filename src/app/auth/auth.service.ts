import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authTokenCheck = new Subject<boolean>();
  error = new Subject<boolean>();
  authTokenDataCheck = false;
  getuserId = new Subject<any>();
  userIds: string;
  private transactionsubject = new Subject<any>();
  url = 'http://13.233.56.179:9090/INGTMRWModelBank/';
  errors = new Subject<boolean>();
  private getUserDetails = new Subject<any>();
  private listofBen = new Subject<any>();
  constructor(private http: HttpClient, private route: Router) { }


  loginUser(loginForm) {
    console.log(loginForm, 'here');
    this.http.post<{customerId: string, status: string}>( this.url+'api/users', loginForm)
    .subscribe(
      data => {
        console.log(data);
        alert(data.status);
        this.authTokenCheck.next(true);
        this.authTokenDataCheck = true;
        this.userIds = data.customerId;
        console.log(this.userIds);
        this.route.navigate(['account']);
      }, error => {
        console.log(error);
        this.errors.next(false);
        alert(error.error.message);
      }
    )
  }

  getProfileOfUser() {
    return this.authTokenCheck.asObservable();
   }
 
   getauthTokenData() {
     return this.authTokenDataCheck;
   }
 
  getUserInfo() {
   return this.getUserDetails.asObservable();
  }

  getAccountInfo() {
    console.log(this.userIds);
      this.http.get(this.url+'api/customers/'+this.userIds).subscribe(
        (data) => {
         this.getUserDetails.next(data);
         console.log(data);
        }
      )
  }

  getTransactionInfo() {
    this.http.get(this.url+ 'api/transaction/'+this.userIds).subscribe(
      (data) => {
       console.log(data);
       this.transactionsubject.next(data);
      }
    )
}
getTransactionDetails() {
  return this.transactionsubject.asObservable();
} 

  logOut() {
        this.authTokenCheck.next(false);
        this.authTokenDataCheck = false;
        this.userIds = '';
        this.route.navigate(['/']);
  }

  fundTransfet(fundData) {
    this.http.put(this.url+'api/funds', fundData).subscribe(
      data => {
        console.log(data)
        alert('Funds Transferred');
        this.route.navigate(['account']);
      }
    )
  }

  getBeneficiary() {
    this.http.get(this.url+ 'api/beneficiaries/'+this.userIds)
    .subscribe(data => {
      console.log(data);
      this.listofBen.next(data);
    })
  }

  getListBeneficiary() {
    return  this.listofBen.asObservable();
  }


}
