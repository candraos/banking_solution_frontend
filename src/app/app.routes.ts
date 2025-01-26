import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CustomersComponent} from './components/customers/customers.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomersComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
