import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { BankComponent } from './bank/bank.component';
import { AccountDetailsComponent } from './bank/account-details/account-details.component';
import { AccountTransferComponent } from './bank/account-transfer/account-transfer.component';

const routes: Routes = [
{path:'', component: HomeComponent},
{path:'login', component: LoginComponent},
{path: 'account', component: BankComponent, children: [
  {path: '', redirectTo: 'accountDetals', pathMatch: 'full'},
  {path: 'accountDetals', component: AccountDetailsComponent},
  {path: 'fundTransfer', component: AccountTransferComponent}
] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
