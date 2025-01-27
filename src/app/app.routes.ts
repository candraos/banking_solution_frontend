import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductsComponent } from './components/products/products.component';
import { AccountsComponent } from './components/accounts/accounts.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'accounts/:customerId', component: AccountsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
