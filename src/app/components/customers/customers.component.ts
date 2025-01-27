import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddCustomersComponent } from '../add-customers/add-customers.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [HttpClientModule, CommonModule, AddCustomersComponent],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  showAddCustomerForm = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.http.get<any[]>('http://localhost:8080/customer/getAll')
      .subscribe(data => {
        this.customers = data;
        console.log("customers >>>>>>>>>>>>>>>>>>>..", this.customers);
      }, error => {
        console.error('Error fetching customers', error);
      });
  }

  toggleAddCustomerForm() {
    this.showAddCustomerForm = !this.showAddCustomerForm;
  }

  onCustomerAdded() {
    this.fetchCustomers(); // Refresh the customer list
    this.showAddCustomerForm = false;
  }

  checkAccounts(customerId: string) {
    this.router.navigate(['/accounts', customerId]);
  }
}
