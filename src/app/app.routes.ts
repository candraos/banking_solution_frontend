import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductsComponent } from './components/products/products.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { MakeTransactionComponent } from './components/make-transaction/make-transaction.component';
import { TransactionComponent } from './components/transaction/transaction.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'accounts/:customerId', component: AccountsComponent },
  { path: 'transaction/:accountId', component: MakeTransactionComponent },
  { path: 'show-transactions/:accountId', component: TransactionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
