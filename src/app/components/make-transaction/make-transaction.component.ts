import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-make-transaction',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './make-transaction.component.html',
  styleUrl: './make-transaction.component.css'
})
export class MakeTransactionComponent {
  transactionForm: FormGroup;
  accountId!: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private userService: UserService
  ) {
    this.transactionForm = this.fb.group({
      accountId: ['', Validators.required],
      amount: ['', Validators.required],
      type: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.accountId = this.route.snapshot.paramMap.get('accountId')!;
    this.transactionForm.patchValue({ accountId: this.accountId });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;
      console.log("formValue.type >>>>>>>>>>>>>>> ",formValue.type);
      const isDeposit = formValue.type.toLowerCase() === 'deposit';
      const transactionData = {
        accountId: formValue.accountId,
        amount: formValue.amount,
        isDeposit: isDeposit
      };
      console.log('Transaction form submitted', transactionData);
      this.http.post('http://localhost:8080/account/makeTransaction', transactionData)
        .subscribe(response => {
          console.log('Transaction successful', response);
          // Redirect to the previous page
          this.location.back();
                }, error => {
          alert("Transaction failed");
        });
    }
  }
}
