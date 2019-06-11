import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
@ViewChild('f') formData; NgForm
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.isLoading = true
    if(!this.formData.valid) {
      console.log("Login form not valid");
      this.isLoading = false;
      return;
    }
    // console.log(this.formData);
    const userData = {customerId: this.formData.value.customerId, password: this.formData.value.password};
    this.authService.loginUser(userData);
  }

}
