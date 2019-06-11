import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  accounts = [
    {name: "Account Details", link: "accountDetals" },
    {name: "Fund Transfer", link: "fundTransfer" },
  ]
  constructor() { }

  ngOnInit() {
  }

}
