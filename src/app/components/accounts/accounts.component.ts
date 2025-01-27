import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: any[] = [];
  addAccountForm: FormGroup;
  customerId!: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.addAccountForm = this.fb.group({
      ownerId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('customerId')!;
    this.fetchAccounts();
    this.addAccountForm.patchValue({ ownerId: this.customerId });
  }

  fetchAccounts() {
    this.http.get<any[]>(`http://localhost:8080/account/getAll/${this.customerId}`)
      .subscribe(data => {
        this.accounts = data;
        console.log('accounts >>>>>>>>>>>>>>>>>>>..', this.accounts);
      }, error => {
        console.error('Error fetching accounts', error);
      });
  }

  onAddAccount() {
    if (this.addAccountForm.valid) {
      this.http.post('http://localhost:8080/account/create', this.addAccountForm.value)
        .subscribe(response => {
          console.log('Account created successfully', response);
          this.fetchAccounts(); // Refresh the accounts list
          this.addAccountForm.reset();
          this.addAccountForm.patchValue({ ownerId: this.customerId });
        }, error => {
          console.error('Error creating account', error);
        });
    }
  }
}
