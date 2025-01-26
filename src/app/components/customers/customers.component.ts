import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
checkAccounts() {
throw new Error('Method not implemented.');
}
goToAdd() {
throw new Error('Method not implemented.');
}
  customers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.http.get<any[]>('http://localhost:8080/customer/getAll')
      .subscribe(data => {
        this.customers = data;
        console.log("customers >>>>>>>>>>>>>>>>>>>.." , this.customers)
      }, error => {
        console.error('Error fetching customers', error);
      });
  }
}
