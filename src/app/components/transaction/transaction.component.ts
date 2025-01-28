import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: any[] = [];
  accountId!: string;

  constructor(private http: HttpClient, private router: Router,    private route: ActivatedRoute,
  ) {}

    ngOnInit() {
      this.accountId = this.route.snapshot.paramMap.get('accountId')!;

      this.fetchTransactions();
    }

    fetchTransactions() {
      this.http.get<any[]>(`http://localhost:8080/transaction/getall/${this.accountId}`)
        .subscribe(data => {
          this.transactions = data;
        }, error => {
          console.error('Error fetching transactions', error);
        });
    }
}
