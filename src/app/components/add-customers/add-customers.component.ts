import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css']
})
export class AddCustomersComponent {
  addCustomerForm: FormGroup;
  @Output() customerAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.addCustomerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onAddCustomer() {
    if (this.addCustomerForm.valid) {
      this.http.post('http://localhost:8080/customer/create', this.addCustomerForm.value)
        .subscribe(response => {
          console.log('Customer created successfully', response);
          this.addCustomerForm.reset();
          this.customerAdded.emit(); // Emit event to notify parent component
        }, error => {
          console.error('Error creating customer', error);
        });
    }
  }
}
