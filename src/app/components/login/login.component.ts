import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router,RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService

  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("login >>>>>>>>>>>>>>>>>>>>>. ",this.loginForm.value);
    if (this.loginForm.valid) {
      this.http.post('http://localhost:8080/customer/login', this.loginForm.value)
        .subscribe((response: any) => {
          // Handle successful login
          console.log('Login successful', response);
          this.userService.setUserId(response.id); // Save user ID

          if (response.admin === true) {
        this.router.navigate(['/customers']);
          } else {
        this.router.navigate(['/accounts', response.id], { queryParams: { admin: response.isAdmin } });
          }
        }, error => {
          // Handle login error
          alert('wrong username or password');
          console.error('Login failed', error);
        });
    }
  }
}
