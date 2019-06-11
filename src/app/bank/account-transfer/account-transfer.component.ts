import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-account-transfer',
  templateUrl: './account-transfer.component.html',
  styleUrls: ['./account-transfer.component.css']
})
export class AccountTransferComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  transfer: FormGroup;
  profiles = {};
  beneficiary = [];
  constructor(private authService: AuthService) { }

  ngOnInit() {
 
    this.transfer = new FormGroup({
      'account': new FormControl('', Validators.required),
      'accountBalance': new FormControl('', Validators.required),
      'beneficiary': new FormControl('', Validators.required),
      'amount': new FormControl('',  [Validators.required]),
      'comment': new FormControl('', Validators.required),
    });
    this.authService.getBeneficiary();
    this.authService.getListBeneficiary().subscribe(
      data => {
        console.log(data);
        this.beneficiary = data;
      }
    )
    this.authService.getAccountInfo();
    this.authService.getUserInfo().subscribe(
      profile => {
        console.log(profile);
        this.profiles = profile;
        this.transfer.patchValue({
          account: profile.customerId,
          accountBalance: profile.balance
        });
      }
    )
  }

  onSubmit() {
    if(!this.transfer.valid) {
      console.log('failed');
      return;
    }
   // console.log(this.serializedDate.value);
    console.log(this.transfer);
    const userData = {
      "amount": this.transfer.value.amount,  
      "beneficiaryId": this.transfer.value.beneficiary,   
      "customerId": this.transfer.value.account,  
      "remarks": this.transfer.value.comment
    }
console.log(userData);
    this.authService.fundTransfet(userData);
  }

}
